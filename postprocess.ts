// 2023-07-18 update
// 2.5 to 4 yo class
// https://yarraleisure.perfectgym.com.au/clientportal2/Groups/GroupDetailsModal/Details?groupId=6462

// {
//   "Id": 6462,
//   "Name": "Tuesday 10.00am Preschoolers",
//   "ClubId": 3,
//   "PhotoUrl": null,
//   "Vacancies": 1,
//   "BookingIndicator": {
//     "Indicator": 1,
//     "Limit": 8,
//     "Available": 1
//   },
//   "Durations": [
//     "PT30M"
//   ],
//   "Level": "Preschoolers",
//   "Trainer": "Robyn Gosbell",
//   "TrainerDetails": null,
//   "Status": "Bookable",
//   "AboutGroup": null,
//   "ClassDates": [
//     {
//       "Dates": [
//         "2023-07-18T10:00:00"
//       ],
//       "Day": "Tue"
//     }
//   ],
//   "Users": [
//     {
//       "GroupInfo": {
//         "GroupIsFull": true,
//         "NotMatchingAge": false,
//         "NotMatchingLevel": false,
//         "LevelCanBeAssessed": false,
//         "EnrollmentNotActive": false,
//         "UserAlreadyInGroup": false,
//         "GroupEnded": false,
//         "GroupNotAvailableForApplication": false,
//         "GroupIsLocked": false,
//         "InvalidDates": false,
//         "CanEnrollToGroup": false,
//         "CanEnrollToGroupWithForce": true
//       },
//       "IsTransferAvailable": false,
//       "ActivityCategoryId": 88,
//       "Status": "Unavailable",
//       "Reason": null,
//       "User": {
//         "Id": 189039,
//         "FirstName": "Callum",
//         "LastName": "Miller",
//         "PhotoUrl": null,
//         "Initials": "CM",
//         "IsCurrentUser": false
//       },
//       "BookedSeatNumber": null,
//       "StandByQueueNumber": null
//     },
//     {
//       "GroupInfo": {
//         "GroupIsFull": true,
//         "NotMatchingAge": true,
//         "NotMatchingLevel": false,
//         "LevelCanBeAssessed": false,
//         "EnrollmentNotActive": false,
//         "UserAlreadyInGroup": false,
//         "GroupEnded": false,
//         "GroupNotAvailableForApplication": false,
//         "GroupIsLocked": false,
//         "InvalidDates": false,
//         "CanEnrollToGroup": false,
//         "CanEnrollToGroupWithForce": true
//       },
//       "IsTransferAvailable": false,
//       "ActivityCategoryId": 88,
//       "Status": "Unavailable",
//       "Reason": null,
//       "User": {
//         "Id": 189038,
//         "FirstName": "Daniel",
//         "LastName": "Miller",
//         "PhotoUrl": null,
//         "Initials": "YOU",
//         "IsCurrentUser": true
//       },
//       "BookedSeatNumber": null,
//       "StandByQueueNumber": null
//     }
//   ]
// }

import {
  readJSON,
  writeJSON,
  // writeCSV,
} from "https://deno.land/x/flat@0.0.15/mod.ts";
import { Octokit } from "https://esm.sh/@octokit/rest";

const octokit = new Octokit({
  auth: Deno.env.get("GH_TOKEN"),
});

const json = await readJSON(Deno.args[0]);
if ( json.BookingIndicator.Available >= 1 ) {

  try {
      await octokit.request("POST /repos/dalanmiller/baby-swim-flat/issues", {
        owner: "dalanmiller",
        repo: "baby-swim-flat",
        title: `Class available ${swimClass.name}`,
        assignees: ["dalanmiller"],
        body: `
    # ${swimClass.name}
    status: ${swimClass.status}
    available: ${swimClass.available}
    limit: ${swimClass.limit}

    https://yarraleisure.perfectgym.com.au/clientportal2/?saquwjj4kvg5rhji23pg24fh4e=mxa3seq5jbe75bguags2gsr3ye#/Groups/3?ageLimitId=3&vacancies=1

    @dalanmiller
    `,
      });
    } catch (e) {
      console.log(e);
    }
}

const jsonFilePath = "last_read.json"
await writeJSON(jsonFilePath, json);

// const currentClasses = [];
// for (const c of json.Data) {
//   const swimClass = {
//     name: c.Name,
//     status: c.Status,
//     available: c.BookingIndicator.Available,
//     limit: c.BookingIndicator.Limit,
//   };
//   currentClasses.push(swimClass);

//   if (
//     swimClass.available > 0 &&
//     swimClass.name.includes("Tuesday")
//   ) {
//     try {
//       await octokit.request("POST /repos/dalanmiller/baby-swim-flat/issues", {
//         owner: "dalanmiller",
//         repo: "baby-swim-flat",
//         title: `Class available ${swimClass.name}`,
//         assignees: ["dalanmiller"],
//         body: `
//     # ${swimClass.name}
//     status: ${swimClass.status}
//     available: ${swimClass.available}
//     limit: ${swimClass.limit}

//     https://yarraleisure.perfectgym.com.au/clientportal2/?saquwjj4kvg5rhji23pg24fh4e=mxa3seq5jbe75bguags2gsr3ye#/Groups/3?ageLimitId=3&vacancies=1

//     @dalanmiller
//     `,
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   }
// }

// if (currentClasses.length) {
//   await writeCSV(csvFilePath, currentClasses);
// } else {
//   await writeCSV(csvFilePath, [
//     { name: null, status: null, available: null, limit: null },
//   ]);
// }
