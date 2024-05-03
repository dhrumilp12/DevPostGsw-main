## Event Spotlight and Reservation System.

## Live Application
The application is currently deployed and can be accessed at the following URL:

Event Spotlight and Reservation System: [study-schedular-d814462ae5eb.herokuapp.com](https://event-spotlight-8456c8fae13a.herokuapp.com/)
Visit the link to interact with the live version of the Study Scheduler application.

## Project Description:
Event Spotlight & Reservation System is designed to revolutionize the way local communities interact with events and businesses. Our application harnesses the power of Square's robust APIs to create a seamless, intuitive experience for both event organizers and attendees.

 ## New Features Implementation:
1. Event Management:
   - Users can create, manage, and discover local events directly within the app. This includes setting up event details like time, date, and inventory using Square’s Inventory API to track event-related items.

2. Advanced Booking System:
   - Integrated with Square's Booking API, allowing users to book reservations for events effortlessly. It supports real-time updates and manages bookings directly from the dashboard.

3. Dynamic Payment Processing:
   - Utilizes Square's Payments API for handling transactions, providing a secure and fast payment process for event tickets and merchandise sold at events.

4. Customer Engagement:
   - Leverages the Customers API for managing customer profiles, enabling personalized marketing and tailored event recommendations, which enhances user engagement and loyalty.

5. Real-time Inventory Updates:
   - Syncs with Square's Inventory API to provide real-time updates on merchandise availability, helping organizers manage resources effectively and avoid overbooking or stock-outs.

6. Loyalty Program Integration (still working on it):
   - Integrates Square's Loyalty API, allowing event organizers to reward attendees with loyalty points, which can be redeemed against tickets or merchandise, fostering community spirit and repeat attendance.

7. Simplified Data Entry for Locations and Team Members:
   - Incorporates Square's Location API and Team API to enhance user interface elements, providing dropdown menus for easy selection of locations and team member IDs. This integration simplifies form-filling processes, making it more convenient for users to interact with our application.


## Challenges Overcome:
- Implementing a unified system that handles various aspects of event management from bookings to payments and customer management.
- Ensuring real-time synchronization between the front-end and Square APIs to provide a seamless user experience.
- Integrating multiple APIs to work cohesively, ensuring data consistency across all modules.

## APIs Used:
- Square Payments API: For processing and managing payments.
- Square Bookings API: For handling bookings and reservations.
- Square Customers API: For managing customer profiles and interactions.
- Square Inventory API: For inventory management related to events.
- Square Loyalty API: For managing loyalty programs and rewards.(work in progress)
-Square Locations API: For retrieve a list of all Location.
-Square Team API: For managing and displaying a list of active team members.

This comprehensive use of Square APIs not only enhances the functionality of the Event Spotlight & Reservation System but also ensures that the application is scalable, secure, and efficient, providing a valuable tool for businesses to engage with their local communities.

## User Interface and Experience Enhancements:
-  Context-Sensitive Data Pre-Filling: The interface is designed to auto-populate fields based on the user’s interactions within the application. For example, when a user selects an event from the catalog, the system automatically fills in the relevant details (like service variation ID, Team member ID, and time) in the booking form. This reduces repetitive input and accelerates the booking process.

## Technical Implementation:
1. Seamless Integration with Square APIs:
   - Our application is built on a robust architecture that integrates seamlessly with Square's APIs. This integration allows for fluid data flow and real-time updates across the platform, ensuring that event organizers can manage events efficiently and attendees can enjoy a seamless experience.

2. Security and Compliance:
   -  In adhering to the highest standards of digital security, our system processes all transactions using Square's secure payment methodologies. Regular audits and compliance with international security standards such as PCI DSS ensure that user data is protected at all times.

3. Responsive and Adaptive Design:
   - The user interface is designed to be responsive and adaptive, providing an optimal viewing and interaction experience across a wide range of devices. This responsiveness ensures that the application is accessible anywhere, from large desktop monitors to mobile phones.

## Summary:
Event Spotlight & Reservation System is not just a platform; it's a bridge connecting businesses with their local communities through technology-driven solutions. It harnesses the power of Square’s technology to create meaningful interactions and experiences that benefit both businesses and community members. With its advanced features and thoughtful integration of Square APIs, our application stands out as a premier solution for local event management and community engagement.


 ## Planned Feature Enhancement: Role-Based Access Control:
## Future Enhancements:
- Role or State Field in Customer Profiles:
  - We plan to introduce a "role or state" field in the customer profiles to distinguish between buyers, sellers, and admins. This enhancement will enable the system to tailor the web interface and functionalities to suit the specific roles of users:
    - Buyers will have access to event browsing, booking, and loyalty rewards functionalities.
    - Sellers will be able to manage event listings, track bookings, and view analytics on customer engagement and inventory.
    - Admins will have overarching control with capabilities to manage user roles, moderate content, and configure system settings to ensure smooth operation.

This role-based approach not only improves security by restricting access to sensitive functionalities based on user roles but also enhances the user experience by providing a customized interface that focuses on the needs and tasks relevant to each user type. This strategic implementation is aimed at increasing efficiency and user satisfaction by ensuring that each user interacts with the most relevant features for their needs.



## Installation
To set up the project locally, follow these steps:

1. Clone the repository: https://github.com/dhrumilp12/DevPostGsw-main.git
2. Navigate to the project directory: cd DevPostGsw-main 
3. Install dependencies: npm install
4. Navigate to the project directory: cd DevPostGsw-main/my-square-app 
5. Install dependencies: npm install
   

## Usage
To run the application: 
1. Navigate to the project directory: cd DevPostGsw-main 
 run code: node server.js
2. Navigate to the project directory: cd DevPostGsw-main/my-square-app
 run code: npm start


## Deployment 
To deploy the application, follow these steps:
1. Set the necessary environment variables as described in `.env.example`.

## License
This project is released under the MIT License. See the LICENSE file for details.



## Created with ❤️ by Dhrumil

