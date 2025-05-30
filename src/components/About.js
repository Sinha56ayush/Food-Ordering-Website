
import User from "./User";
import UserClass from "./UserClass";
import React from "react";



class About extends React.Component{

    constructor(props){
        super(props);
        console.log("Parent constructor called");
    }

    componentDidMount(){
        console.log("Parent component did mount");
    }


    render() {
        console.log("Parent render called");
      
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-10">
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-8">
              {/* Header Section */}
              <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
                About Us
              </h1>
              <h2 className="text-xl font-medium text-center text-gray-600 mb-8">
                Let’s explore routers
              </h2>
      
              {/* User Section */}
              <div className="space-y-6">
                {/* <User name="Ayush Sinha(functional)" /> */}
                <UserClass
                  name="First"
                  location="Patna Class"
                  className="p-4 bg-gray-100 rounded-lg shadow-sm"
                />
                {/* <UserClass name="Second" location="Patna Class" /> */}
              </div>
            </div>
          </div>
        );
      }
      
}












export default About;