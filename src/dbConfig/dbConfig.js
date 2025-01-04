import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        const connection = mongoose.connection;

        connection.on('connected' ,()=>{
            console.log('mongodb connected successfully');
        })
        connection.on('error',(error)=>{
            console.log(error);
        })
    } catch (error) {
        console.log(error);
    }
}