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
//         ...
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
//         ...
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
import * as log from "https://deno.land/std@0.194.0/log/mod.ts";

const octokit = new Octokit({
  auth: Deno.env.get("GITHUB_TOKEN"),
});

const json = await readJSON(Deno.args[0]);
if ( json.BookingIndicator.Available > 1 ) {
  log.info("Found available booking?")

  try {
    log.info("Attempting to make request to Github")
    await octokit.request("POST /repos/dalanmiller/baby-swim-flat/issues", {
      owner: "dalanmiller",
      repo: "baby-swim-flat",
      title: `Class available! ${json.name}`,
      assignees: ["dalanmiller"],
      body: `
  # ${json.name}
  status: ${json.status}
  available: ${json.BookingIndicator.Available}
  limit: ${json.BookingIndicator.Limit}

  UserDetail: ${targetUser.GroupInfo}

  https://yarraleisure.perfectgym.com.au/clientportal2/?saquwjj4kvg5rhji23pg24fh4e=mxa3seq5jbe75bguags2gsr3ye#/Groups/3?ageLimitId=3&vacancies=1

  @dalanmiller
  `,
    });
  } catch (e) {
    log.error(e);
    Deno.exit(1)
  }
}
