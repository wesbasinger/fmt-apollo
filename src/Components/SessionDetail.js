import React from 'react';


/*  SAMPLE SINGLE CAST DATA
{
  "Id": "5a4e41f91941a10e0bad2993",
  "firstName": "Annabelle",
  "lastName": "Basinger",
  "sessions": [
    {
      "slug": "FA17",
      "show": "Cats",
      "active": false,
      "hours": [
        
      ],
      "__typename": "Session"
    },
    {
      "slug": "SP18",
      "show": "Beauty and the Beast",
      "active": true,
      "hours": [
        {
          "Id": "5a4ea51babfdd80008673dc0",
          "worker": "Wes Basinger",
          "comment": "test comment",
          "datestamp": "2018-01-04 22:05:15.036608",
          "timeIn": 1515103515.0752,
          "timeOut": 1515120536.7634,
          "castId": "5a4e41f91941a10e0bad2993",
          "remote": false,
          "__typename": "Hours"
        },
        {
          "Id": "5a4eb6323b5a9e000883db2a",
          "worker": "Wes Basinger",
          "comment": "Testing.",
          "datestamp": "2018-01-04 23:18:10.662199",
          "timeIn": 1515107890.6935,
          "timeOut": 1515121855.4742,
          "castId": "5a4e41f91941a10e0bad2993",
          "remote": false,
          "__typename": "Hours"
        },
        {
          "Id": "5a4eecf902609f0008b91cba",
          "worker": "Wesley Charles Basinger",
          "comment": "This is a end to end test of the functionality.",
          "datestamp": "2018-01-05 03:11:53.206329",
          "timeIn": 1515121913.2205,
          "timeOut": 1515122072.5481,
          "castId": "5a4e41f91941a10e0bad2993",
          "remote": false,
          "__typename": "Hours"
        }
      ],
      "__typename": "Session"
    }
  ],
  "__typename": "Cast"
}
*/

const tsToDate = (unixTimestamp) => {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    const date = new Date(unixTimestamp*1000);
    // Hours part from the timestamp
    const hours = date.getHours();
    // Minutes part from the timestamp
    const minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    const seconds = "0" + date.getSeconds();
    
    // Will display time in 10:30:23 format
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

const calcHours = (timeIn, timeOut) => {
    return (timeOut - timeIn) / 3600
}

const formatHours = (decimalHours) => {
    
    const delim = decimalHours.toString().split(".")
    
    const hours = delim[0]
    
    const minutes = Math.round(("0." + delim[1])*60);
    
    if (decimalHours > 1) {
        return(`${hours} hours and ${minutes} minutes`)
    } else {
        return(`${minutes} minutes`) 
    }
}

const totalHours = (hoursArray) => {
    let total = 0;
    
    hoursArray.forEach((hours) => {
        total += calcHours(hours.timeIn, hours.timeOut)
    })
    
    return total;
}

const SessionDetail = ({show, slug, hours}) => {
    
    return(
        <div className="container">
            <h2>{show}</h2>
            <h2>{slug}</h2>
            <h3>Logged Hours: {formatHours(totalHours(hours))}</h3>
            <h3>Remaining Hours: { (totalHours(hours) < 16) ? formatHours(16 - totalHours(hours)) : "Finished!"}</h3>
            <h3>History</h3>
            <table>
                <thead>
                    <tr>
                        <td>Worker</td>
                        <td>Datestamp</td>
                        <td>Time In</td>
                        <td>Time Out</td>
                        <td>Remote</td>
                        <td>Comment</td>
                        <td>Time Logged</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        hours.map((hour) => {
                            return(
                                <tr key={hour.id}>
                                    <td>{hour.worker || ""}</td>
                                    <td>{hour.datestamp || ""}</td>
                                    <td>{tsToDate(hour.timeIn) || ""}</td>
                                    <td>{tsToDate(hour.timeOut) || ""}</td>
                                    <td>{hour.remote.toString() || ""}</td>
                                    <td>{hour.comment || ""}</td>
                                    <td>
                                        {
                                            formatHours(calcHours(hour.timeIn, hour.timeOut))
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default SessionDetail;
