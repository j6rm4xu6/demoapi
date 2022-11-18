// const Router = require('koa-router');
const Controller = require('../controller')
const Hotel = require('../../models/Hotel.js');

// const router = new Router()

// router.post('/api/v1/hotels', addHotels);
let app;

class HotelsController extends Controller {
    constructor(_app, namespace) {
      super(_app, namespace);
      app = _app;
    }

    /**
     * @inheritdoc
     */
    routes() {
      return [
        ['post', '/v1/hotels', this.addHotels],
        ['get', '/v1/hotels/find/:id', this.findHotels],
        ['put', '/v1/hotels/:id', this.editHotels],
        ['delete', '/v1/hotels/:id', this.deleteHotels],
        ['get', '/v1/hotels', this.getHotels],
      ];
    }


    async addHotels(ctx) {
        const newHotel = new Hotel(ctx.request.body);

        try {
            const saveHotel = await newHotel.save();

            ctx.status = 200;
            ctx.body = {
                result: 'ok',
                ret: saveHotel,
            };
        } catch (error) {
            ctx.status = 500;
        }
    };

    async findHotels(ctx) {
        const id = ctx.params.id;

        try {
           const getHotel = await Hotel.findById(id);

            ctx.status = 200;
            ctx.body = {
                result: 'ok',
                ret: getHotel,
            };
        } catch (error) {
            ctx.status = 500;
        }
    };

    async editHotels (ctx) {
        const id = ctx.params.id;
        const body = ctx.request.body

        try {
            const updatedHotel = await Hotel.findByIdAndUpdate(id, {$set:body}, {new:true});

            ctx.status = 200;
            ctx.body = {
                result: 'ok',
                ret: updatedHotel,
            };
        } catch (error) {
            ctx.status = 500;
        }
    }

    async deleteHotels (ctx) {
        const id = ctx.params.id;

        try {
            await Hotel.findByIdAndDelete(id);

            ctx.status = 200;
            ctx.body = {
                result: 'ok',
                ret: "刪除資料成功",
            };
        } catch (error) {
            ctx.status = 500;
        }
    }

    async getHotels (ctx) {
        try{
            const hotelsList = await Hotel.find();

            ctx.status = 200;
            ctx.body = {
                result: 'ok',
                ret: hotelsList,
            };
        }catch(error){
            ctx.status = 500;
        }
    }
};

// const addHotels = async (ctx) => {
//     const newHotel = new Hotel(ctx.request.body);

//     try {
//         const saveHotel = await newHotel.save();

//         ctx.status = 200;
//         ctx.body = {
//             result: 'ok',
//             ret: saveHotel,
//         };
//     } catch (error) {
//         ctx.status = 500;
//     }
// };

//router.get("/api/v1/hotels/find/:id", findHotels);

// const findHotels = async (ctx) => {
//     const id = ctx.params.id;

//     try {
//        const getHotel = await Hotel.findById(id);

//         ctx.status = 200;
//         ctx.body = {
//             result: 'ok',
//             ret: getHotel,
//         };
//     } catch (error) {
//         ctx.status = 500;
//     }
// };

// router.put("/api/v1/hotels/:id", editHotels);


// const editHotels = async (ctx) => {
//     const id = ctx.params.id;
//     const body = ctx.request.body

//     try {
//         const updatedHotel = await Hotel.findByIdAndUpdate(id, {$set:body}, {new:true});

//         ctx.status = 200;
//         ctx.body = {
//             result: 'ok',
//             ret: updatedHotel,
//         };
//     } catch (error) {
//         ctx.status = 500;
//     }
// }

// router.delete("/api/v1/hotels/:id", deleteHotels)

// const deleteHotels = async(ctx) => {
//     const id = ctx.params.id;

//     try {
//         await Hotel.findByIdAndDelete(id);

//         ctx.status = 200;
//         ctx.body = {
//             result: 'ok',
//             ret: "刪除資料成功",
//         };
//     } catch (error) {
//         ctx.status = 500;
//     }
// }

// router.get("/api/v1/hotels", getHotels)

// const getHotels = async(ctx) => {
//     try{
//         const hotelsList = await Hotel.find();

//         ctx.status = 200;
//         ctx.body = {
//             result: 'ok',
//             ret: hotelsList,
//         };
//     }catch(error){
//         ctx.status = 500;
//     }
// }

module.exports = HotelsController;
