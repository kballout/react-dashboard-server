const { MongoClient } = require("mongodb");
var {Double} = require("mongodb");
require('dotenv').config()
let database; //global

class DB {
    #url

    constructor() {
        this.#url = process.env.MONGO_GUILD_URI
    }

    async #connect() {
            let client = new MongoClient(this.#url);
            await client.connect();
            return client;
    }

    async getAllGuildData(dbName){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let general = await doc.findOne({Name: 'General Settings'})
        let programs = await doc.findOne({Name: 'Program IDs'}) 
        doc = database.collection("Teams");
        let teams = [];
        let cursor = doc.find();
        while(await cursor.hasNext()){
            teams.push(await cursor.next());
        }
        doc = database.collection("Stores");
        let stores = [];
        cursor = doc.find();
        while(await cursor.hasNext()){
            stores.push(await cursor.next());
        }
        doc = database.collection("Emblems");
        let emblems = [];
        cursor = doc.find();
        while(await cursor.hasNext()){
            emblems.push(await cursor.next());
        }

        return {general, programs, teams, stores, emblems}

    }

    async checkIfExists(dbName){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Initialize");
        let fieldName = "Started";
        let value = await doc.distinct(fieldName);
        if(value[0] === true){
            return true;
        }
        return false;
    }



    //GENERAL
    async getAllGeneralData(dbName){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        var query = {Name: "General Settings"};
        return await doc.findOne(query);   
    }

    async changeExchangeRate(dbName, rate){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let fieldName = "Exchange Rate";
        let value = await doc.distinct(fieldName);
        doc.findOneAndUpdate({['Exchange Rate']: value[0] },
        {$set:{'Exchange Rate': rate}}, function(err, res){
            if (err) throw err;
        });
        
    }

    async changeMaxOffenses(dbName, num){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let fieldName = "Max Offenses";
        let value = await doc.distinct(fieldName);
        doc.findOneAndUpdate({['Max Offenses']: value[0] },
        {$set:{'Max Offenses': num}}, function(err, res){
            if (err) throw err;
        });
        
    }

    async changeDailyChallenges(dbName, num){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let fieldName = "Daily Challenges";
        let value = await doc.distinct(fieldName);
        doc.findOneAndUpdate({['Daily Challenges']: value[0] },
        {$set:{'Daily Challenges': num}}, function(err, res){
            if (err) throw err;
        });
        
    }

    async changeBonusAmount(dbName, num, choice){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let fieldName;
        if(choice === 'Offenses Bonus'){
            fieldName = 'Offenses Bonus'
        }
        else if(choice === 'Exchange Bonus'){
            fieldName = 'Exchange Bonus'
        }
        else if(choice === 'Points Bonus'){
            fieldName = 'Point Bonus'
        }
        else{
            fieldName = 'Streak Bonus'
        }
        
        let value = await doc.distinct(fieldName);
        doc.findOneAndUpdate({[fieldName]: value[0] },
        {$set:{[fieldName]: Double(num)}}, function(err, res){
            if (err) throw err;
        });
        
    }

    async changeLevel1Buyer(dbName, num){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let fieldName = "Buyer 1 Level";
        let value = await doc.distinct(fieldName);
        doc.findOneAndUpdate({['Buyer 1 Level']: value[0] },
        {$set:{'Buyer 1 Level': num}}, function(err, res){
            if (err) throw err;
        });
        
    }

    async changeLevel2Buyer(dbName, num){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let fieldName = "Buyer 2 Level";
        let value = await doc.distinct(fieldName);
        doc.findOneAndUpdate({['Buyer 2 Level']: value[0] },
        {$set:{'Buyer 2 Level': num}}, function(err, res){
            if (err) throw err;
        });
        
    }

    async changeLevel3Buyer(dbName, num){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let fieldName = "Buyer 3 Level";
        let value = await doc.distinct(fieldName);
        doc.findOneAndUpdate({['Buyer 3 Level']: value[0] },
        {$set:{'Buyer 3 Level': num}}, function(err, res){
            if (err) throw err;
        });
        
    }

    async changeBonusDaySchedule(dbName, num){
        let client = this.#connect();
        database = (await client).db(dbName);
        num = this.parseBool(num);
        let doc = database.collection("Guild Settings");
        let fieldName = "Automatic Monthly Bonus";
        let value = await doc.distinct(fieldName);
        doc.findOneAndUpdate({['Automatic Monthly Bonus']: value[0] },
        {$set:{'Automatic Monthly Bonus': num}}, function(err, res){
            if (err) throw err;
        });
        
    }

    async changeChallengesResetTime(dbName, num){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let fieldName = "Reset Challenges Time";
        let value = await doc.distinct(fieldName);
        doc.findOneAndUpdate({['Reset Challenges Time']: value[0] },
        {$set:{'Reset Challenges Time': num}}, function(err, res){
            if (err) throw err;
        });
        
    }

    async changeBoostTimeLimit(dbName, num){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let fieldName = "Boost Time Limit";
        let value = await doc.distinct(fieldName);
        doc.findOneAndUpdate({['Boost Time Limit']: value[0] },
        {$set:{'Boost Time Limit': num}}, function(err, res){
            if (err) throw err;
        });
        
    }

    async changeMultipliers(dbName, type, mult ,num){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let fieldName;
        let value;
        if(type === 'rank'){
            if(mult === 'equal'){
                fieldName = "Rank Multipliers.Equal";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Rank Multipliers.Equal']: value[0] },
                {$set:{'Rank Multipliers.Equal': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'oneHigherRank'){
                fieldName = "Rank Multipliers.One Higher";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Rank Multipliers.One Higher']: value[0] },
                {$set:{'Rank Multipliers.One Higher': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'twoHigherRanks'){
                fieldName = "Rank Multipliers.Two Higher";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Rank Multipliers.Two Higher']: value[0] },
                {$set:{'Rank Multipliers.Two Higher': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'oneLowerRank'){
                fieldName = "Rank Multipliers.One Lower";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Rank Multipliers.One Lower']: value[0] },
                {$set:{'Rank Multipliers.One Lower': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'twoLowerRanks'){
                fieldName = "Rank Multipliers.Two Lower";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Rank Multipliers.Two Lower']: value[0] },
                {$set:{'Rank Multipliers.Two Lower': num}}, function(err, res){
                    if (err) throw err;
                });
            }  
        }
        if(type === 'tier'){
            if(mult === 'equal'){
                fieldName = "Tier Multipliers.Equal";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Tier Multipliers.Equal']: value[0] },
                {$set:{'Tier Multipliers.Equal': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'oneHigherTier'){
                fieldName = "Tier Multipliers.One Higher";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Tier Multipliers.One Higher']: value[0] },
                {$set:{'Tier Multipliers.One Higher': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'twoHigherTiers'){
                fieldName = "Tier Multipliers.Two Higher";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Tier Multipliers.Two Higher']: value[0] },
                {$set:{'Tier Multipliers.Two Higher': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'oneLowerTier'){
                fieldName = "Tier Multipliers.One Lower";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Tier Multipliers.One Lower']: value[0] },
                {$set:{'Tier Multipliers.One Lower': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'twoLowerTiers'){
                fieldName = "Tier Multipliers.Two Lower";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Tier Multipliers.Two Lower']: value[0] },
                {$set:{'Tier Multipliers.Two Lower': num}}, function(err, res){
                    if (err) throw err;
                });
            }  
        }
        if(type === 'team'){
            if(mult === 'equal'){
                fieldName = "Team Multipliers.Equal";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Team Multipliers.Equal']: value[0] },
                {$set:{'Team Multipliers.Equal': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'oneHigherTeam'){
                fieldName = "Team Multipliers.One Higher";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Team Multipliers.One Higher']: value[0] },
                {$set:{'Team Multipliers.One Higher': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'twoHigherTeams'){
                fieldName = "Team Multipliers.Two Higher";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Team Multipliers.Two Higher']: value[0] },
                {$set:{'Team Multipliers.Two Higher': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'oneLowerTeam'){
                fieldName = "Team Multipliers.One Lower";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Team Multipliers.One Lower']: value[0] },
                {$set:{'Team Multipliers.One Lower': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'twoLowerTeams'){
                fieldName = "Team Multipliers.Two Lower";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Team Multipliers.Two Lower']: value[0] },
                {$set:{'Team Multipliers.Two Lower': num}}, function(err, res){
                    if (err) throw err;
                });
            }  
        }
        
        
    }

    async changeIcon(dbName, choice, url){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        if(choice === 'matchIcon'){
            let fieldName = "Matchmaking Icon";
            let value = await doc.distinct(fieldName);
            doc.findOneAndUpdate({['Matchmaking Icon']: value[0] },
            {$set:{'Matchmaking Icon': url}}, function(err, res){
                if (err) throw err;
            });
        }
        else if(choice === 'bossIcon'){
            let fieldName = "Boss Icon";
            let value = await doc.distinct(fieldName);
            doc.findOneAndUpdate({['Boss Icon']: value[0] },
            {$set:{'Boss Icon': url}}, function(err, res){
                if (err) throw err;
            });
        }
        else if(choice === 'bossWinIcon'){
            let fieldName = "Boss Win";
            let value = await doc.distinct(fieldName);
            doc.findOneAndUpdate({['Boss Win']: value[0] },
            {$set:{'Boss Win': url}}, function(err, res){
                if (err) throw err;
            });
        }
        else if(choice === 'bossLossIcon'){
            let fieldName = "Boss Lose";
            let value = await doc.distinct(fieldName);
            doc.findOneAndUpdate({['Boss Lose']: value[0] },
            {$set:{'Boss Lose': url}}, function(err, res){
                if (err) throw err;
            });
        }
        else if(choice === 'store1Icon'){
            doc = database.collection("Stores");
            let filter = {Name: 'Store 1'};
            let update = {$set: {'Icon': url}};
            await doc.updateOne(filter, update);
        }
        else if(choice === 'store2Icon'){
            doc = database.collection("Stores");
            let filter = {Name: 'Store 2'};
            let update = {$set: {'Icon': url}};
            await doc.updateOne(filter, update);
        }
        else if(choice === 'store3Icon'){
            doc = database.collection("Stores");
            let filter = {Name: 'Store 3'};
            let update = {$set: {'Icon': url}};
            await doc.updateOne(filter, update);
        }
        else {
            doc = database.collection("Stores");
            let filter = {Name: 'Team Store'};
            let update = {$set: {'Icon': url}};
            await doc.updateOne(filter, update);
        }

        
        
    }

    //MODERATION
    async getBadWordsList(dbName){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let fieldName = "Bad Words List.words";
        return await doc.distinct(fieldName);
        
    }

    async setBadWordsList(dbName, words){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let fieldName = "Bad Words List";
        let filter = {'Name': 'General Settings'};
        var removeItem = {$unset:{[fieldName]: {}}};
        await doc.updateOne(filter, removeItem);
        let newItem = { $set: {[fieldName]:{
           words
        }}}
        await doc.updateOne(filter, newItem, {upsert: true})

        
    }



    //TEAMS
    async getAllTeamData(dbName){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Teams");
        var allTeams = [];
        let cursor = doc.find();
        while(await cursor.hasNext()){
            allTeams.push(await cursor.next());
        }
       return allTeams;
    }

    async getOneTeam(dbName, teamName){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Teams");
        var query = {Name: teamName};
        return await doc.findOne(query);
    }

    async updateTeamPoints(dbName, teamName, points){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Teams");
        let filter = {Name: teamName};
        let update = {$set: {Points: points}};
        await doc.updateOne(filter, update);
    }

    async updateTeamTier(dbName, teamName, tier){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Teams");
        let filter = {Name: teamName};
        let update = {$set: {Tier: tier}};
        await doc.updateOne(filter, update);
    }

    async updateTeamFlag(dbName, teamName, url){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Teams");
        let filter = {Name: teamName};
        let update = {$set: {'Team Flag': url}};
        await doc.updateOne(filter, update);
    }

    async checkTeamNameValid(dbName, teamName){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Teams");
        let filter = {Name: teamName};
        return await doc.findOne(filter);
    }



    //STORES
    async getAllStoresData(dbName){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        var allStores = [];
        let cursor = doc.find();
        while(await cursor.hasNext()){
            allStores.push(await cursor.next());
        }
       return allStores;       
    }

    async getStoreItemTotal(dbName, store){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        let filter = {Name: store};
        let res = await doc.findOne(filter);
        return Object.keys(res['Items']).length;
    }

    async getItemData(dbName, store, itemNumber){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        var search = 'Items.' + 'Item ' + itemNumber;
        return await doc.distinct(search , {Name:store});
    }
    
    async getStoreIcons(dbName){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        let storeIcons = [];
        var filter = {Name: 'Store 1'};
        let value = await doc.distinct('Icon', filter)
        storeIcons.push({'Store 1': value[0]});
        
        filter = {Name: 'Store 2'}
        value = await doc.distinct('Icon', filter)
        storeIcons.push({'Store 2': value[0]});
 
        filter = {Name: 'Store 3'}
        value = await doc.distinct('Icon', filter)
        storeIcons.push({'Store 3': value[0]});

        filter = {Name: 'Team Store'}
        value = await doc.distinct('Icon', filter)
        storeIcons.push({'Team Store': value[0]});
        return storeIcons;
    }

    async getAllStoreNames(dbName){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        return await doc.find({}, {projection:{'_id': 0, 'Name': 1}}).toArray();     
    }

    async getWorldEvent(dbName){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        return await doc.distinct("World Event");
    }
    
    async editWorldEvent(dbName, val){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let value = await doc.distinct('World Event.Status');
        doc.findOneAndUpdate({['World Event.Status']: value[0] },
        {$set:{'World Event.Status': val}}, function(err, res){
            if (err) throw err;
        });
        if(val === false){
            this.changeWorldEventCost(dbName, 0);
        }
    }

    async changeWorldEventCost(dbName, val){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let value = await doc.distinct('World Event.Cost');
        doc.findOneAndUpdate({['World Event.Cost']: value[0] },
        {$set:{'World Event.Cost': Double(val)}}, function(err, res){
            if (err) throw err;
        });
    }

    //UPDATES STORE
    async updateItemName(dbName, store, item, name){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        var search = 'Items.' + 'Item ' + item + '.Name';
        let filter = {Name: store};
        let update = {$set:{[search]: name}};
        await doc.updateOne(filter, update);
    }

    async updateItemQuantity(dbName, store, item, qty){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        var search = 'Items.' + 'Item ' + item + '.Qty';
        let filter = {Name: store};
        let update = {$set:{[search]: qty}};
        await doc.updateOne(filter, update);
    }
 
    async updateItemCost(dbName, store, item, cost){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        var search = 'Items.' + 'Item ' + item + '.Cost';
        let filter = {Name: store};
        let update = {$set:{[search]: Double(cost)}};
        await doc.updateOne(filter, update);
    }

    async updateItemNumber(dbName, store, item, number){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        var search = 'Items.' + 'Item ' + item + '.Number';
        let filter = {Name: store};
        let update = {$set:{[search]: number}};
        await doc.updateOne(filter, update);
    }

    async updateItemAvailable(dbName, store, item, available){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        var search = 'Items.' + 'Item ' + item + '.Available';
        let filter = {Name: store};
        let update = {$set:{[search]: this.parseBool(available)}};
        await doc.updateOne(filter, update);
    }

    async createNewItem(dbName, store, itemNumber, itemName, itemQuantity, itemCost, itemAvailable){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        var location = 'Items.' + 'Item ' + itemNumber;
        var newItem = {
            $set:{
                [location]:{
                    Number: parseInt(itemNumber),
                    Name: itemName,
                    Qty: itemQuantity,
                    Cost: Double(itemCost),
                    Available: this.parseBool(itemAvailable)
                }
            }
        }
        let filter = {Name: store};
        await doc.updateOne(filter, newItem, {upsert: true})
    }

    async deleteItem(dbName, store, itemNumber){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");

        //Inital Delete item entry
        var location = 'Items.' + 'Item ' + itemNumber;
        var removeItem = {$unset:{[location]: {}}};
        let filter = {Name: store};
        await doc.updateOne(filter, removeItem);
        
        //get total items currently
        var total = await this.getStoreItemTotal(dbName, store);
        total++;
        //Update new store
        var nextLocation, nextRemove;
        for(var i  = itemNumber; i < total; i++){
            this.updateItemNumber(dbName, store, 1 + i, i);
            var data = await this.getItemData(dbName,store, 1 + i);
            this.createNewItem(dbName, store, i, 
                data[0]['Name'], 
                parseInt(data[0]['Qty']), 
                parseFloat(data[0]['Cost']), 
                this.parseBool(data[0]['Available'])
                )
            //Delete old item
            nextLocation = 'Items.' + 'Item ' + (1 + i);
            nextRemove = {$unset:{[nextLocation]: {}}};
            await doc.updateOne(filter, nextRemove);
        }
    }


    //ADDITIONAL STORES
    async createNewAdditionalStore(dbName, storeName, ID ,levelRequired, roleID){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        let newStore = {
            Name: storeName,
            ID: ID,
            'Role ID': roleID,
            'Level Required': levelRequired,
            Icon: '',
            Options:{

            },
            Items: {
                'Item 1': {
                    Number: 1,
                    Name: "",
                    Cost: Double(0),
                    Available: false
                },
                'Item 2': {
                    Number: 2,
                    Name: "",
                    Cost: Double(0),
                    Available: false
                },
                'Item 3': {
                    Number: 3,
                    Name: "",
                    Cost: Double(0),
                    Available: false
                }
            }
        }
        await doc.insertOne(newStore);
    }

    async getSingleStoreData(dbName, store){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        return await doc.find({Name: store}, {projection:{'_id': 0, 'Name': 1, 'Level Required': 1, 'Icon': 1, 'Options': 1}}).toArray();
    }

    async getStoreOptionsSize(dbName, store){
        let client = this.#connect();
        database = (await client).db(dbName);
        let options = await this.getSingleStoreData(dbName, store);
        return Object.values(options[0]['Options']).length;
    }

    async getNumberForStoreOption(dbName, store, option){
        let client = this.#connect();
        database = (await client).db(dbName);
        let options = await this.getSingleStoreData(dbName, store);
        for(let [key, value] of Object.entries(options[0]['Options'])){
            if(value === option){
                return key;
            }
        }
    }

    async updateStoreLevelRequired(dbName, store, level){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        let filter = {Name: store};
        let update = {$set: {'Level Required': level}};
        await doc.updateOne(filter, update);
    }

    async updateStoreIcon(dbName, store, icon){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        let filter = {Name: store};
        let update = {$set: {Icon: icon}};
        await doc.updateOne(filter, update);
    }

    async addStoreOption(dbName, store, option, length){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        let field = `Options.${length}`
        let filter = {Name: store};
        await doc.updateOne(filter, {$set:{[field]: option}})
    }

    async removeStoreOption(dbName, store, option){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        let num = await this.getNumberForStoreOption(dbName, store, option);
        let field = `Options.${num}`;
        let filter = {Name: store};
        await doc.updateOne(filter, {$unset:{[field]: option}})
        
    }

    async updateOptionNumbers(dbName, store){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        let allOptions = await this.getSingleStoreData(dbName, store);
        let currOptions = await this.getAllCurrentOptions(dbName, store);
        let filter = {Name: store};
        let field;
        //remove all options first
        for(let [key, value] of Object.entries(allOptions[0]['Options'])){
            field = `Options.${key}`
            await doc.updateOne(filter, {$unset:{[field]: value}})
        }
        //set new option numbers
        for(let i = 0; i < currOptions.length; i++){
            field = `Options.${i}`
            doc.updateOne(filter, {$set:{[field]: currOptions[i]}})
        }
    }

    async getAllCurrentOptions(dbName, store){
        let client = this.#connect();
        database = (await client).db(dbName);
        let options = await this.getSingleStoreData(dbName, store);
        return Object.values(options[0]['Options']);
    }
    
    async deleteStore(dbName, store){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        await doc.deleteOne({Name: store});
    }







    //PROGRAMS
    async getAllProgramData(dbName){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        var query = {Name: "Program IDs"};
        return await doc.findOne(query);   
    }

    async updateProgramCount(dbName, count){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        var filter = {Name: "Program IDs"};
        let search = 'Total Programs';
        let update = {$set:{[search]: count}}
        doc.updateOne(filter, update);
    }

    async createNewProgram(dbName, progNumber, progName, progFactor ,progBonusType, progBonusAmount){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let location = 'Programs.' + 'Program ' + progNumber;
        let newItem = {
            $set:{
                [location]:{
                    Name: progName,
                    Factor: Double(progFactor),
                    Count: 0,
                    'Bonus Type': progBonusType,
                    'Bonus Amount': Double(progBonusAmount)
                }
            }
        }
        let filter = {Name: 'Program IDs'};
        await doc.updateOne(filter, newItem, {upsert: true})
        let newCount = {$set:{'Total Programs': progNumber}};
        await doc.updateOne(filter, newCount);
    }

    async getOneProgram(dbName, num){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        var query = "Programs.Program " + num;
        
        return await doc.distinct(query, {Name: 'Program IDs'});   
    }

    async updateProgName(dbName, num, name){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        var search = 'Programs.Program ' + num + '.Name';
        let filter = {Name: 'Program IDs'};
        let update = {$set:{[search]: name}};
        await doc.updateOne(filter, update);
    }

    async updateProgFactor(dbName, num, factor){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        var search = 'Programs.Program ' + num + '.Factor';
        let filter = {Name: 'Program IDs'};
        let update = {$set:{[search]: Double(factor)}};
        await doc.updateOne(filter, update);
    }

    async updateProgBonusAmount(dbName, num, bonus){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        var search = 'Programs.Program ' + num + '.Bonus Amount';
        let filter = {Name: 'Program IDs'};
        let update = {$set:{[search]: Double(bonus)}};
        await doc.updateOne(filter, update);
    }

    async updateProgBonusType(dbName, num, type){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        var search = 'Programs.Program ' + num + '.Bonus Type';
        let filter = {Name: 'Program IDs'};
        let update = {$set:{[search]: type}};
        await doc.updateOne(filter, update);
    }

    async deleteProgram(dbName, number){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");

        let removedName = await doc.distinct('Programs.Program ' + number + '.Name', {Name: 'Program IDs'}); 
        //Inital Delete program entry
        var location = 'Programs.Program ' + number;
        var removeItem = {$unset:{[location]: {}}};
        let filter = {Name: 'Program IDs'};
        await doc.updateOne(filter, removeItem);
        
        //get total programs currently
        var total = await doc.distinct('Total Programs', filter);
        total;
        //Update new programs
        var nextLocation, nextRemove;
        for(var i  = number; i < total; i++){
            var data = await this.getOneProgram(dbName, 1 + i);
            this.createNewProgram(dbName, i, 
                data[0]['Name'],
                parseFloat(data[0]['Factor']),
                parseInt(data[0]['Bonus Type']),
                parseFloat(data[0]['Bonus Amount']))
            //Delete old item
            nextLocation = 'Programs.Program ' + (1 + i);
            nextRemove = {$unset:{[nextLocation]: {}}};
            await doc.updateOne(filter, nextRemove);
        }
        total--;
        this.updateProgramCount(dbName, total);
        this.deleteProgramForAllUsers(dbName, removedName);

    }

    async updateProgramForAllUsers(dbName, programName){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Player Profile");
        let filter;
        let totalAttendance = 'Participation.Total Attendance Per Program.' + programName;
        let highestStreak = 'Participation.Highest Streaks Per Program.' + programName;
        let currentStreaksInitial = 'Participation.Current Streaks.' + programName + '.Initial';
        let currentStreaksCurr = 'Participation.Current Streaks.' + programName + '.Current';
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        let update = {$set:{[totalAttendance]: 0}}
        await doc.updateMany({}, [update], {upsert: false, multi:true});
        update = {$set:{[highestStreak]: 0}}
        await doc.updateMany({}, [update], {upsert: false, multi:true});
        update = {$set:{[currentStreaksInitial]: 0}}
        await doc.updateMany({}, [update], {upsert: false, multi:true});
        update = {$set:{[currentStreaksCurr]: 0}}
        await doc.updateMany({}, [update], {upsert: false, multi:true});
        

        let nextVariable, nextMonth;
        for(let i = 0; i < months.length; i++){
            nextVariable = 'Participation.Monthly Attendance Per Program.' + programName + '.' + months[i];
            nextMonth = {$set:{[nextVariable]: 0}};
            await doc.updateMany({}, nextMonth,{upsert: false, multi:true});
        }

    }

    async deleteProgramForAllUsers(dbName, progName){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Player Profile");

        let location1 = 'Participation.Total Attendance Per Program.' + progName;
        let location2 = 'Participation.Highest Streaks Per Program.' + progName;
        let location3 = 'Participation.Current Streaks.' + progName;
        let location4 = 'Participation.Monthly Attendance Per Program.' + progName;
        
      
        await doc.updateMany({}, {$unset:{[location1]: 1, [location2]: 1, [location3]: 1, [location4]: 1}}, {multi:true} );
    }


    //EMBLEMS
    async getAllEmblemInfo(dbName){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Emblems");
        var allEmblems = [];
        let cursor = doc.find();
        while(await cursor.hasNext()){
            allEmblems.push(await cursor.next());
        }
       return allEmblems;    
    }

    async getOneEmblem(dbName, emblem){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Emblems");
        var query = {Name: emblem};
        return await doc.findOne(query);    
    }

    async editEmblemTitle(dbName, emblem, title){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Emblems");
        var search = 'Information.Title';
        let filter = {Name: emblem};
        let update = {$set:{[search]: title}};
        await doc.updateOne(filter, update);
    }

    async editEmblemAmount(dbName, emblem, amount){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Emblems");
        var search = 'Information.Amount';
        let filter = {Name: emblem};
        let update 
        if(emblem === 'Total Points' || emblem === 'Total Exchange' || emblem === 'Donated Points'){
           update = {$set:{[search]: Double(amount)}};
        }
        else{
            update = {$set:{[search]: amount}}; 
        }
        await doc.updateOne(filter, update);
    }

    //LEADERBOARDS
    async getTopUsersPoints(dbName){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Player Profile");
        let allUsers = new Map(); 
        let finalMap = new Map(); 
        let cursor = doc.find();
        let nextDoc;
        while(await cursor.hasNext()){
            nextDoc = await cursor.next();
            allUsers.set(await doc.distinct('User ID', nextDoc), await doc.distinct('Points', nextDoc) );
        }
        allUsers = new Map([...allUsers.entries()].sort((a, b) => b[1] - a[1]));
        return allUsers;
    }

    async getAllUsers(dbName){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Player Profile");
        return await doc.find({}, {projection: {'_id': 0,'User ID': 1}}).toArray();
    }

    async getUserCurrPoints(dbName, user){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Player Profile");
        return await doc.distinct('Points', {'User ID': user});
    }

    async getUserTotalPoints(dbName, user){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Player Profile");
        return await doc.distinct('Statistics.Points Earned.Total', {'User ID': user});
    }

    async getUserMonthlyPoints(dbName, user){
        let client = this.#connect();
        database = (await client).db(dbName);
        let amount
        let doc = database.collection("Player Profile");
        amount = parseFloat(await doc.distinct('Statistics.Points Earned.Monthly.January', {'User ID': user}));
        amount += parseFloat(await doc.distinct('Statistics.Points Earned.Monthly.February', {'User ID': user}));
        amount += parseFloat(await doc.distinct('Statistics.Points Earned.Monthly.March', {'User ID': user}));
        amount += parseFloat(await doc.distinct('Statistics.Points Earned.Monthly.April', {'User ID': user}));
        amount += parseFloat(await doc.distinct('Statistics.Points Earned.Monthly.May', {'User ID': user}));
        amount += parseFloat(await doc.distinct('Statistics.Points Earned.Monthly.June', {'User ID': user}));
        amount += parseFloat(await doc.distinct('Statistics.Points Earned.Monthly.July', {'User ID': user}));
        amount += parseFloat(await doc.distinct('Statistics.Points Earned.Monthly.August', {'User ID': user}));
        amount += parseFloat(await doc.distinct('Statistics.Points Earned.Monthly.September', {'User ID': user}));
        amount += parseFloat(await doc.distinct('Statistics.Points Earned.Monthly.October', {'User ID': user}));
        amount += parseFloat(await doc.distinct('Statistics.Points Earned.Monthly.November', {'User ID': user}));
        amount += parseFloat(await doc.distinct('Statistics.Points Earned.Monthly.December', {'User ID': user}));
        return amount.toFixed(1);
    }

    async getUserTotalExchange(dbName, user){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Player Profile");
        return await doc.distinct('Statistics.Exchange.Total', {'User ID': user});
    }

    async getUserMonthlyExchange(dbName, user){
        let client = this.#connect();
        database = (await client).db(dbName);
        let amount
        let doc = database.collection("Player Profile");
        amount = parseFloat(await doc.distinct('Statistics.Exchange.Monthly.January', {'User ID': user}));
        amount += parseFloat(await doc.distinct('Statistics.Exchange.Monthly.February', {'User ID': user}));
        amount += parseFloat(await doc.distinct('Statistics.Exchange.Monthly.March', {'User ID': user}));
        amount += parseFloat(await doc.distinct('Statistics.Exchange.Monthly.April', {'User ID': user}));
        amount += parseFloat(await doc.distinct('Statistics.Exchange.Monthly.May', {'User ID': user}));
        amount += parseFloat(await doc.distinct('Statistics.Exchange.Monthly.June', {'User ID': user}));
        amount += parseFloat(await doc.distinct('Statistics.Exchange.Monthly.July', {'User ID': user}));
        amount += parseFloat(await doc.distinct('Statistics.Exchange.Monthly.August', {'User ID': user}));
        amount += parseFloat(await doc.distinct('Statistics.Exchange.Monthly.September', {'User ID': user}));
        amount += parseFloat(await doc.distinct('Statistics.Exchange.Monthly.October', {'User ID': user}));
        amount += parseFloat(await doc.distinct('Statistics.Exchange.Monthly.November', {'User ID': user}));
        amount += parseFloat(await doc.distinct('Statistics.Exchange.Monthly.December', {'User ID': user}));
        return amount.toFixed(1);
    }

    async getUserHighestStreak(dbName, user){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Player Profile");
        return await doc.distinct('Participation.All Time Highest Streak', {'User ID': user});
    }

    async getUserTotalAttendance(dbName, user){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Player Profile");
        return await doc.distinct('Participation.Complete Total', {'User ID': user});
    }

    async getUserLevel(dbName, user){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Player Profile");
        return await doc.distinct('Level', {'User ID': user});
    }

    async getUserXP(dbName, user){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Player Profile");
        return await doc.distinct('XP', {'User ID': user});
    }

    async getUserTotalMsg(dbName, user){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Player Profile");
        return await doc.distinct('Messages Sent', {'User ID': user});
    }

    async getUserName(dbName, user){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Player Profile");
        return await doc.distinct('Name', {'User ID': user});
    }

    async getUserAvatar(dbName, user){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Player Profile");
        return await doc.distinct('Avatar', {'User ID': user});
    }

    async getUserDiscriminator(dbName, user){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Player Profile");
        return await doc.distinct('Discriminator', {'User ID': user});
    }


    parseBool(val) { 
        if(val === 'true'){
            return true;
        }
        return false;
    }
    
    async closeConnection(){
        await client.close();
    }
}

module.exports = DB;