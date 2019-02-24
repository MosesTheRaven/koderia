import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp()

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const listUsers = functions.https.onRequest((request, response) => {
  var enums = {}
  admin.database().ref('enums/programmer')
  .once('value', (enumsSnapshot)=>{
    enums = enumsSnapshot.val()
  })
  // sem by sa dopisali este query detaily ako napriklad kolko ich ma nacitat naraz
  admin.database().ref('programmers')
  // once preto, lebo on itemov je zatial malo, mozeme vziat cely podstrom
  // value, pretoze vezmeme cely podstrom
  .once('value', (programmersSnapshot)=>{
    // check if null
    if(programmersSnapshot.val()) var programmers = programmersSnapshot.val()
    // preiterujeme json 
    for (var programmerKey in programmers) {
      // vytvorime uzivatela, ktoreho posleme mailchimpu
      if (programmers.hasOwnProperty(programmerKey)) {  
        let programmer = programmers[programmerKey]
        let mailchimpProgrammer = 
          {
            "email_address": programmer.email,
            "status": "subscribed",
            "merge_fields": {
                "FNAME": programmer.name,
                "LNAME": programmer.surname,
                "PROG_TYPE" : enums.type[programmer.selectedProgrammerTypes[0]],
                "ARCH_BOOL": programmer.isArchitect ? 'Ano' : 'Nie',
                "TLEAD_BOOL" : programmer.isTeamLeader ? 'Ano' : 'Nie',
                "DOM_BOOL" : programmer.workedDomain ? 'Ano' : 'Nie',
            }
        }
      }
  }
  })
  .then(()=>{
    response.send('kekeleke')
  })
  .catch((error)=>{
    console.log(error)
  })
  
});
