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
    private static modelMapping: { [key: string]: () => ModelQueryBuilderContract<any, any>} = {
        'user': () => User.query(),
        'profile': () => Profile.query(),
        'event': () => Event.query(),
        'social': () => Social.query(),
    }

    private static columnMapping: { [key: string]: string } = {
        'boolean': 'checkbox',
        'integer': 'number',
        'timestamp with time zone': 'datetime-local',
        'character varying': 'text',
        'text': 'text',
    }

    /* 
    |--------------------------------------------------------------------------
    | getRawCounts
    |--------------------------------------------------------------------------
    */
    public static async getRawResourceCounts() {
        const fetchCounts = await Promise.all([
            await User.query().count('* as total'),
            await Profile.query().count('* as total'),
            await Event.query().count('* as total'),
            await Social.query().count('* as total'),
        ])

        const counts = {
            users: Number(fetchCounts[0][0].$extras.total),
            profiles: Number(fetchCounts[1][0].$extras.total),
            events: Number(fetchCounts[2][0].$extras.total),
            socials: Number(fetchCounts[3][0].$extras.total),
        }

        return counts
    }

    /* 
    |--------------------------------------------------------------------------
    | getResource
    |--------------------------------------------------------------------------
    */
    // This function returns a list of resources based on the param (or lack thereof - param WIP) passed in

    
    public static async getResource() {
        // not sure how or if I want to implement this
        // await this.initializeCounts()
        const count = await User.query().count('* as total')
        const records = await User.query().paginate(1, 10)
        const resource = {
            title: 'User',
            count: count[0].$extras.total,
            keys: User.$keys.attributesToColumns['keys'],
            records: records.serialize()
        }
        
        return resource
    }
    /* 
    |--------------------------------------------------------------------------
    | getManyResources
    |--------------------------------------------------------------------------
    */
    // This function returns a list of resources based on the param (or lack thereof - param WIP) passed in

    
    public static async getManyResources(param?: string ) {
        // not sure how or if I want to implement this
        // await this.initializeCounts()
        let resources: Resource[] = []
        let records
        let columnTypes
        

        for (const resource of this.resources) {
            let model: () => ModelQueryBuilderContract<any, any>

            const count = await resource.query().count('* as total')
            // const keys = resource.$keys.attributesToColumns['keys']
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
                        col_description(pg_class.oid, a.attnum) <> 'system'
                `)
                console.log(columns)
                columns = columns.rows.reduce((acc, column) => {
                    acc[column.column_name] = column.data_type;
                    return acc;
                }, {})

                

                console.log(columns)
                
                for (const col in columns) {
                    columns[col] = this.columnMapping[columns[col]]
                }
                
                // records.push(recordReq)
                records = recordsJSON
                columnTypes = columns
            } 
                resources.push({ title: resource.name, keys: keys, count: count[0].$extras.total })
        }
        console.log(records)
        return {resources, records, columnTypes}
    }
}


