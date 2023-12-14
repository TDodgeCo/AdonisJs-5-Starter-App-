import Social from "App/Models/Social"
import Event from "App/Models/Event"
import User from "App/Models/User"
import Profile from "App/Models/Profile"
import { ModelObject } from "@ioc:Adonis/Lucid/Orm"
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'

interface Resource {
    title: string,
    keys: Record<string, any>,
    count: number,
    records?: ModelObject | ModelObject[]
}

// This service is used to get data for app resources. 
// It's primary function is to pull data down for various models in situations that don't 
// explicitly call for a specific model. Think dashboard, admin panel, etc...

export default class ResourceService {
    private static resources = [User, Profile, Event, Social]
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
    | getManyResources
    |--------------------------------------------------------------------------
    */
    // This function returns a list of resources based on the param (or lack thereof - param WIP) passed in

    
    public static async getManyResources(param?: string ) {
        // not sure how or if I want to implement this
        // await this.initializeCounts()
        let resources: Resource[] = []
        
        

        for (const resource of this.resources) {
            let model: () => ModelQueryBuilderContract<any, any>

            const count = await resource.query().count('* as total')
            const keys = resource.$keys.attributesToColumns['keys']

            if (param == `${resource.name.toLowerCase()}`) {
                
                model = this.modelMapping[param]
                if (!model) throw new Error(`No model mapping found for ${param}`)
                const records = await model().paginate(1, 10)
                resources.push({ title: resource.name, keys: keys, count: count[0].$extras.total, records: records })
                continue
            } 
                resources.push({ title: resource.name, keys: keys, count: count[0].$extras.total })
        }
        
        return resources
    }
}