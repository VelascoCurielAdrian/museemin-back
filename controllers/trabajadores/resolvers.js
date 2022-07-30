const validator = require('./validator');
const MESSAGES = require('./error.message');
const { Trabajadores } = require('../../models');
const { UserInputError } = require('apollo-server');
const { objectFilter, orderFormat } = require('../../helpers/general');

const resolvers = {
  Query: {
    trabajadores: async (root,{ limit = 25, offset = 0, order = ['id'] }) => {
      try {        
        return await Trabajadores.findAndCountAll({
          where:{
            activo: true,
            estatus: true
          },  
          order: orderFormat(order),
          ...objectFilter({ offset: offset * (limit), limit: limit > 0 ? limit : null }),
        }).then(data => {
          return{
            count: data.count,
            rows: data.rows
          };
        });
      }catch (error){
        return error; 
      }
    },
    // worker: async (_,{ id }, {}) => {
    //   try {
    //     if (isNaN(parseInt(id))) throw MESSAGES.id;
    //     const exist = await Worker.count  ({ where: { id } });
    //     if (!exist) throw MESSAGES.exist;
    //     return await Worker.findByPk(id);
    //   } catch (e) {
    //     return e;
    //   }
    // }
  },
  Mutation: {
    crearTrabajador: async (_, { input }, {}) => {
      try {
        const { isValid, fields, paths } = validator(input);
        if (!isValid) throw new UserInputError('Input Error', { fields, paths });
        if (input.telefono && input.telefono.length !== 10) throw MESSAGES.telefono;
        const dataCreated = await Trabajadores.create({ ...input });
        return dataCreated.dataValues;
      } catch (e) {
        return e;
      }
    },
    // updateWorker: async (_, { id, input }, {}) => {
    //   try {
    //     const { isValid, fields, paths } = validator(input);
    //     if (!isValid) throw new UserInputError('Input Error', { fields, paths });
    //     if (input.phone && input.phone.length !== 10) throw MESSAGES.phone;
    //     if(isNaN(parseInt(id))) throw MESSAGES.id;
    //     const exist = await Worker.count({ where: { id }});
    //     if(!exist) throw MESSAGES.exist;
    //     input.firstName = input.firstName.replace(/\s+/g, ' ').trim();
    //     input.lastName = input.lastName ? input.lastName.replace(/\s+/g, ' ').trim() : '';
    //     const dataUpdated = await Worker.update(input, {
    //       where: { id },
    //       returning: true,
    //       plain: true,
    //     });
    //     return dataUpdated[1].dataValues;
    //   } catch (e) {
    //     return e;
    //   }
    // },
    // deleteWorker: async (_, { id }, {}) => {
    //   try {
    //     if(isNaN(parseInt(id))) throw MESSAGES.id;
    //     const exist = await Worker.count({ where: { id : id }});
    //     if(!exist) throw MESSAGES.exist;
    //     const dataDeleted = await Worker.destroy({ where: { id }, returning: true });
    //     return dataDeleted[0].dataValues;
    //   } catch (e) {
    //     return e;
    //   }
    // }
  }
}

module.exports = resolvers;
