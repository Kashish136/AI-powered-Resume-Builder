import mongoose from "mongoose";


const connectDb = async() => {

 try{

    mongoose.connection.on("connected" , () => {console.log("Database connected successfullyy")})

    let mongodbURI = process.env.MONGODB_URI ;
    const projectName = 'ResumeBuilder' ;


if(!mongodbURI){
    throw new Error("MONGODB_URI environment variable not set")
}
 
if(mongodbURI.endsWith('/')){
    mongodbURI = mongodbURI.slice(0,-1)
}


await mongoose.connect(`${mongodbURI}/${projectName}`)

} catch(error){



    console.log("Failed to connect with MongoDB:" , error)



}

}

export default connectDb ;