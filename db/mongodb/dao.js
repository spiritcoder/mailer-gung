const User = require('./mongoose_models/User')
const mongoose = require('mongoose');


class Dao{

    async create(model, data){
        return model.create(data);
    }

    async findOneById(model,id){
        return model.findById(id);
    }

    async findOne(model,query){
        return model.findOne(query);
    }

    async queryOne(model, query){
        return model.findOne(query);
    }

    async updateOne(model, id, update){
        return model.findByIdAndUpdate(id, update);
    }

    async updateQuery(model, id, query){
        return model.update({_id:id},{$set:query},{multi:true,new:true});
    }

    async queryMore(model, query){
        return model.find(query);
    }

    async deleteOne(model, query){
        return model.remove(query);
    }

    async deleteById(model, id){
        return model.remove({_id:id});
    }

    async countQuery(model, query){
        return model.countDocuments(query);
    }
}

module.exports = new Dao();

