import mongoose from 'mongoose'

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log('Connected to MongoDB')
    } catch (err) {
        console.log('Error connecting to MongoDB',err)
    }
}

export default connectToDB;