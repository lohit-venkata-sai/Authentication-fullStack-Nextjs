import { connect } from "@/dbConfig/dbConfig";

import User from "@/models/userModel";

import bcryptjs from 'bcryptjs'

connect()

export async function POST(request) {
    try {
        //covert userdata to json data such that it can be stored/posted in the db
        const reqBody = await request.json();
        console.log(reqBody);
        const { username, email, password } = reqBody;
        //check if email already exists in the db
        const user = await User.findOne({ email });

        if (user) {
            return new Response(JSON.stringify({ error: 'user already exists' }), { status: 400 })
        }

        //hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        //create user in db
        const userToBeSaved = new User({ username, email, password: hashedPassword });
        console.log(userToBeSaved);
        const savedUser = await userToBeSaved.save();
        console.log(savedUser);

        return new Response(JSON.stringify({ message: 'user created successfully', success: true, savedUser }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: "is this the error " }), { status: 500 });
    }
}



