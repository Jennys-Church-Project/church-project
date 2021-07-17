/*
 * File: constants.js                                                          *
 * Project: church-project                                                     *
 * Created Date: Thursday, June 3rd 2021, 11:11:55 am                          *
 * -----                                                                       *
 * Last Modified: Thursday, June 24th 2021 6:13:21 am                          *
 */

// local storage
export const kUserId = "user.id";
export const kUserType = "user.type";
export const kUserToken = "user.token";
export const kUser = "user.data";

// website name
export const kAppName = "Nexudus";

// services
export const services = [
  {
    id: "56e83216-910d-47a3-84fc-f96782456702",
    title: "Learning the ways of God",
    banner:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2h1cmNofGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    speakers: ["1", "2", "3"],
    date: "August 6, 2021",
    duration: "7:00pm - 9:30pm",
    attendants: [],
  },
  {
    id: "bf5de770-1254-4609-9562-ba6476927453",
    title: "Power in the Word of God",
    banner:
      "https://images.unsplash.com/photo-1499652848871-1527a310b13a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2h1cmNofGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    speakers: ["4", "5"],
    date: "August 12, 2021",
    duration: "7:00am - 11:30am",
    attendants: [],
  },
  {
    id: "143b37c4-f895-400d-9a1b-8a1e8faa5b4f",
    title: "The Last Supper: Its Essence",
    banner:
      "https://images.unsplash.com/photo-1520629716099-d147346eb224?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNodXJjaHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    speakers: ["3", "6"],
    date: "August 18, 2021",
    duration: "6:30pm - 12:30am",
    attendants: [],
  },
];

// speakers
export const speakers = [
  {
    id: "1",
    avatar:
      "https://images.unsplash.com/photo-1614630506358-aa32b8cb40a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    name: "Andre Oppong",
    church: "Flame of Fire Ministry",
    bio: "Andre Oppong is the founder of Flame of Fire Ministry. He is a loving husband to Natasha and a father to four children",
  },
  {
    id: "2",
    avatar:
      "https://images.unsplash.com/photo-1569056901579-db998caa338b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    name: "Ben Fitzgerald",
    church: "Awakening Room",
    bio: "Ben Fitzgerald is the founder of Awakening Room Ministry.",
  },
  {
    id: "3",
    avatar:
      "https://images.unsplash.com/photo-1582115422763-db7417d14db2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    name: "Meesh Fomenko",
    church: "Be Moved",
    bio: "Meesh Fomenko is the founder of Be Moved Ministry",
  },
  {
    id: "4",
    avatar:
      "https://images.unsplash.com/photo-1610593103211-172fb5236724?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
    name: "Isaac Brempongmaa",
    church: "God Is Alive",
    bio: "Isaac Brempongmaa (PhD) is the founder of Flame of Fire Ministry.",
  },
  {
    id: "5",
    avatar:
      "https://images.unsplash.com/photo-1515295411605-71de55c34a9d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    name: "Solomon Owusu",
    church: "God Is Alive",
    bio: "Solomon Owusu is co-pastor at Flame of Fire Ministry.",
  },
  {
    id: "6",
    avatar:
      "https://images.unsplash.com/photo-1602025747027-bce6e5dc32b9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1790&q=80",
    name: "Shadrach Moses",
    church: "God Is Alive",
    bio: "Shadrach Moses is co-pastor at Flame of Fire Ministry.",
  },
];

export const faqs = [
  {
    id: "1",
    title: "Church Address",
    desc: "33645 20th Avenue South, Federal Way, WA 98003",
  },
  {
    id: "2",
    title: "Upcoming programme details",
    desc: "Please checkout the programmes section",
  },
  {
    id: "3",
    title: "Transportation",
    desc: "You are responsible for your own transportation. Please check with your hotel if they offer shuttle buses",
  },
  {
    id: "4",
    title: "Food Details",
    desc: "Food is not included in the cost of registration. The church has a cafe open every day from 9am to 7pm with coffeem sandwiches and salads. We will also have food trucks ready to serve you on Tuesdays, Wednesdays and Thursdays",
  },
  {
    id: "5",
    title: "Children",
    desc: "There is a nursing room available for mothers. Older children have a dedicated worship center just on the ground floor of the auditorium.",
  },
  {
    id: "6",
    title: "I want to volunteer",
    desc: "We love volunteers. Please reach out to info@kingdomdomain.com",
  },
];
