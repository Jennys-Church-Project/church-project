/*
 * File: constants.js                                                          *
 * Project: church-project                                                     *
 * Created Date: Thursday, June 3rd 2021, 11:11:55 am                          *
 * -----                                                                       *
 * Last Modified: Thursday, June 24th 2021 6:13:21 am                          *
 */

// database references
export const kServicesRef = "services";
export const kFaqsRef = "faqs";
export const kMembersRef = "members";
export const kSpeakersRef = "speakers";
export const kFinancesRef = "finances";

// local storage
export const kUserId = "user.id";
export const kUserType = "user.type";
export const kUserToken = "user.token";
export const kUser = "user.data";

// website name
export const kAppName = "Pentecostal Church";

// services
export const services = [
  {
    id: "56e83216-910d-47a3-84fc-f96782456702",
    title: "Learning the ways of God",
    banner:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2h1cmNofGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper malesuada proin libero nunc consequat interdum. Eget nunc scelerisque viverra mauris. Faucibus et molestie ac feugiat sed lectus. Sit amet mattis vulputate enim nulla aliquet porttitor. Mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing. Vitae justo eget magna fermentum iaculis eu non diam. Amet consectetur adipiscing elit duis tristique. Integer vitae justo eget magna fermentum iaculis eu non diam. Ac turpis egestas sed tempus urna. Varius morbi enim nunc faucibus a pellentesque sit. Amet mattis vulputate enim nulla aliquet. Tristique senectus et netus et. Interdum velit laoreet id donec ultrices tincidunt arcu non sodales. Feugiat pretium nibh ipsum consequat nisl. Duis ut diam quam nulla. Ultricies mi eget mauris pharetra. Sapien et ligula ullamcorper malesuada proin libero nunc. Vitae suscipit tellus mauris a diam maecenas sed. Sit amet commodo nulla facilisi nullam. Diam ut venenatis tellus in metus vulputate eu scelerisque. Etiam dignissim diam quis enim lobortis scelerisque fermentum. Cras sed felis eget velit aliquet. Sed tempus urna et pharetra. Maecenas sed enim ut sem viverra aliquet eget. Neque laoreet suspendisse interdum consectetur libero id faucibus. Auctor elit sed vulputate mi. Nulla facilisi morbi tempus iaculis. Posuere morbi leo urna molestie at. Elementum eu facilisis sed odio morbi quis commodo odio. Venenatis cras sed felis eget velit aliquet sagittis. Sit amet cursus sit amet. Duis tristique sollicitudin nibh sit amet. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus. Risus quis varius quam quisque id diam vel. Suspendisse in est ante in nibh mauris cursus mattis molestie. Consectetur purus ut faucibus pulvinar elementum.",
    speakers: ["1", "2", "3"],
    date: "August 6, 2021",
    stream_url:
      "https://iframe.dacast.com/live/b198df86-2a0d-49e3-c6b0-1a1733908421/0e9a26e2-457c-d9d7-2244-4a062d9664f6",
    duration: "7:00pm - 9:30pm",
    attendants: [],
  },
  {
    id: "bf5de770-1254-4609-9562-ba6476927453",
    title: "Power in the Word of God",
    banner:
      "https://images.unsplash.com/photo-1499652848871-1527a310b13a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2h1cmNofGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper malesuada proin libero nunc consequat interdum. Eget nunc scelerisque viverra mauris. Faucibus et molestie ac feugiat sed lectus. Sit amet mattis vulputate enim nulla aliquet porttitor. Mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing. Vitae justo eget magna fermentum iaculis eu non diam. Amet consectetur adipiscing elit duis tristique. Integer vitae justo eget magna fermentum iaculis eu non diam. Ac turpis egestas sed tempus urna. Varius morbi enim nunc faucibus a pellentesque sit. Amet mattis vulputate enim nulla aliquet. Tristique senectus et netus et. Interdum velit laoreet id donec ultrices tincidunt arcu non sodales. Feugiat pretium nibh ipsum consequat nisl. Duis ut diam quam nulla. Ultricies mi eget mauris pharetra. Sapien et ligula ullamcorper malesuada proin libero nunc. Vitae suscipit tellus mauris a diam maecenas sed. Sit amet commodo nulla facilisi nullam. Diam ut venenatis tellus in metus vulputate eu scelerisque. Etiam dignissim diam quis enim lobortis scelerisque fermentum. Cras sed felis eget velit aliquet. Sed tempus urna et pharetra. Maecenas sed enim ut sem viverra aliquet eget. Neque laoreet suspendisse interdum consectetur libero id faucibus. Auctor elit sed vulputate mi. Nulla facilisi morbi tempus iaculis. Posuere morbi leo urna molestie at. Elementum eu facilisis sed odio morbi quis commodo odio. Venenatis cras sed felis eget velit aliquet sagittis. Sit amet cursus sit amet. Duis tristique sollicitudin nibh sit amet. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus. Risus quis varius quam quisque id diam vel. Suspendisse in est ante in nibh mauris cursus mattis molestie. Consectetur purus ut faucibus pulvinar elementum.",
    speakers: ["4", "5"],
    date: "August 12, 2021",
    stream_url:
      "https://iframe.dacast.com/live/b198df86-2a0d-49e3-c6b0-1a1733908421/0e9a26e2-457c-d9d7-2244-4a062d9664f6",
    duration: "7:00am - 11:30am",
    attendants: [],
  },
  {
    id: "143b37c4-f895-400d-9a1b-8a1e8faa5b4f",
    title: "The Last Supper: Its Essence",
    banner:
      "https://images.unsplash.com/photo-1520629716099-d147346eb224?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNodXJjaHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper malesuada proin libero nunc consequat interdum. Eget nunc scelerisque viverra mauris. Faucibus et molestie ac feugiat sed lectus. Sit amet mattis vulputate enim nulla aliquet porttitor. Mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing. Vitae justo eget magna fermentum iaculis eu non diam. Amet consectetur adipiscing elit duis tristique. Integer vitae justo eget magna fermentum iaculis eu non diam. Ac turpis egestas sed tempus urna. Varius morbi enim nunc faucibus a pellentesque sit. Amet mattis vulputate enim nulla aliquet. Tristique senectus et netus et. Interdum velit laoreet id donec ultrices tincidunt arcu non sodales. Feugiat pretium nibh ipsum consequat nisl. Duis ut diam quam nulla. Ultricies mi eget mauris pharetra. Sapien et ligula ullamcorper malesuada proin libero nunc. Vitae suscipit tellus mauris a diam maecenas sed. Sit amet commodo nulla facilisi nullam. Diam ut venenatis tellus in metus vulputate eu scelerisque. Etiam dignissim diam quis enim lobortis scelerisque fermentum. Cras sed felis eget velit aliquet. Sed tempus urna et pharetra. Maecenas sed enim ut sem viverra aliquet eget. Neque laoreet suspendisse interdum consectetur libero id faucibus. Auctor elit sed vulputate mi. Nulla facilisi morbi tempus iaculis. Posuere morbi leo urna molestie at. Elementum eu facilisis sed odio morbi quis commodo odio. Venenatis cras sed felis eget velit aliquet sagittis. Sit amet cursus sit amet. Duis tristique sollicitudin nibh sit amet. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus. Risus quis varius quam quisque id diam vel. Suspendisse in est ante in nibh mauris cursus mattis molestie. Consectetur purus ut faucibus pulvinar elementum.",
    speakers: ["3", "6"],
    date: "August 18, 2021",
    stream_url:
      "https://iframe.dacast.com/live/b198df86-2a0d-49e3-c6b0-1a1733908421/0e9a26e2-457c-d9d7-2244-4a062d9664f6",
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
