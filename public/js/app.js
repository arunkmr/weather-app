console.log('console is working')

const url1 ='https://api.mapbox.com/geocoding/v5/mapbox.places/boston.json?access_token=pk.eyJ1IjoiYXJ1bmFtaXJ0aGEiLCJhIjoiY2w4Ym43cTZwMDh5NDNucGh1bjZha2U2ciJ9.-PzAZCVp9nZZOqwNgURICA'
fetch(url1).then ((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})

const data = document.querySelector('form')
const search = document.querySelector('input')
const parag1 = document.querySelector('#message-1')
const parag2 = document.querySelector('#message-2')


data.addEventListener('submit', e=>{
    e.preventDefault()
    console.log('testing')
    console.log(search.value)
    parag1.textContent ="Loading..."
    parag2.textContent =""
    if(!search.value){
        console.log('Please Type Location to Search')
        parag1.textContent='Please Type Location to Search'
        parag2.textContent=""
    }else{
        //const url1 ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ search.value +'.json?access_token=pk.eyJ1IjoiYXJ1bmFtaXJ0aGEiLCJhIjoiY2w4Ym43cTZwMDh5NDNucGh1bjZha2U2ciJ9.-PzAZCVp9nZZOqwNgURICA'
        fetch('/weather?address=!'+ search.value ).then ((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    console.log(data.error)
                    parag1.textContent =data.error
                    parag2.textContent=""
                } else {
                    console.log(data)
                    console.log(data.address)
                    console.log(data.forecast)
                    parag1.textContent=data.address
                    parag2.textContent=data.forecast
                }
            })
        })
    }
   
})