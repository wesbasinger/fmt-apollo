// const CENTER_LATITUDE = 32.625484 // CEDAR VALLEY
// const CENTER_LONGITUDE = -96.763224 // CEDAR VALLEY

const CENTER_LATITUDE = 32.6033228; //HOME
const CENTER_LONGITUDE = -96.8633815; //HOME

const TOLERANCE = 0.00974111382

export default (geolocation) => {
    
    console.log("Center latitude: " + CENTER_LATITUDE);
    console.log("Center longitude: " + CENTER_LONGITUDE);
    
    console.log("Tolerance: " + TOLERANCE)
    
    const dist =  Math.sqrt( 
        Math.pow(CENTER_LATITUDE - geolocation.latitude, 2) + Math.pow(CENTER_LONGITUDE - geolocation.longitude,2) 
    )
    
    console.log(dist)
    
    if(dist > TOLERANCE) {
        return true
    } else {
        return false
    }
}