import Social from "App/Models/Social"
import Event from "App/Models/Event"
import User from "App/Models/User"
import Profile from "App/Models/Profile"
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Database from '@ioc:Adonis/Lucid/Database'

interface Resource {
    title: string,
    keys: Record<string, any>,
    count: number
}

// This service is used to get data for app resources. 
// It's primary function is to pull data down for various models in situations that don't 
// explicitly call for a specific model. Think dashboard, admin panel, etc...

export default class ResourceService {
    private static resources = [User, Social, Profile, Event]
    /* 
    |--------------------------------------------------------------------------
    | modelMapping
    |--------------------------------------------------------------------------
    */
    // This maps String model names to their respective query builder functions
    private static modelMapping: { [key: string]: () => ModelQueryBuilderContract<any, any>} = {
        'user': () => User.query(),
        'profile': () => Profile.query(),
        'event': () => Event.query(),
        'social': () => Social.query(),
    }

    /* 
    |--------------------------------------------------------------------------
    | columnMapping
    |--------------------------------------------------------------------------
    */
    // This maps column data types html5 input type proxies
    private static columnMapping: { [key: string]: string } = {
        'boolean': 'checkbox',
        'integer': 'number',
        'timestamp with time zone': 'datetime-local',
        'character varying': 'text',
        'text': 'textarea',
    }

    /* 
    |--------------------------------------------------------------------------
    | getManyResources
    |--------------------------------------------------------------------------
    */
    // This method returns a list of resources, their counts, and html5 input type proxies for each column
    public static async getManyResources(param?: string ) {
        let resources: Resource[] = []
        let records
        let columnTypes
        

        for (const resource of this.resources) {
            let model: () => ModelQueryBuilderContract<any, any>

            const count = await resource.query().count('* as total')
            const keys = resource.$keys.columnsToAttributes['keys']

            if (param == `${resource.name.toLowerCase()}`) {
                
                model = this.modelMapping[param]
                if (!model) throw new Error(`No model mapping found for ${param}`)

                const recordReq = await model().paginate(1, 10)
                const recordsJSON = recordReq.map((record) => record.serialize())

                let columns = await Database
                    .rawQuery(`
                        SELECT 
                            c.column_name, 
                            c.data_type, 
                            col_description(pg_class.oid, a.attnum) as column_comment
                        FROM 
                            information_schema.columns c
                            JOIN pg_catalog.pg_namespace n ON n.nspname = c.table_schema
                            JOIN pg_catalog.pg_class ON pg_class.relnamespace = n.oid
                            JOIN pg_catalog.pg_attribute a ON a.attrelid = pg_class.oid AND a.attname = c.column_name
                        WHERE 
                            c.table_name = '${param}s' AND 
                            pg_class.relname = '${param}s' AND
                            col_description(pg_class.oid, a.attnum) IS NOT NULL AND
                            col_description(pg_class.oid, a.attnum) <> 'system' AND
                            col_description(pg_class.oid, a.attnum) <> 'assignable:admin'
                    `)
                
                columns = columns.rows.reduce((acc, column) => {
                    acc[column.column_name] = column.data_type;
                    return acc;
                }, {})
                
                for (const col in columns) {
                    columns[col] = this.columnMapping[columns[col]]
                }

                records = recordsJSON
                columnTypes = columns
            } 
                resources.push({ title: resource.name, keys: keys, count: count[0].$extras.total })
        }
        console.log(records)
        return {resources, records, columnTypes}
    }
}


