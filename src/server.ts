import app from './app'
import config from './app/config'

import mongoose from 'mongoose'

// Define an asynchronous main function to start the application
async function main() {
  try {
    // Connect to the MongoDB database using the provided URL
    await mongoose.connect(config.database_url as string)

    // Start the Express application by listening on the configured port
    app.listen(config.port, () => {
      console.log(`App is running on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()
