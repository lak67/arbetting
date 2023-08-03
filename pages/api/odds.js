import axios from 'axios'

const handleRequest = async (req, res) => {
    switch(req.method){
      case "GET":
        await getOdds(req,res)
        break;
    }
  }
  export default handleRequest;
  
  
  const getOdds = async (req, res) => {
    try {

// An api key is emailed to you when you sign up to a plan
// Get a free API key at https://api.the-odds-api.com/
const apiKey = '6defccc0a67865118823fa93114313f2'

const sportKey = 'soccer_belgium_first_div' // use the sport_key from the /sports endpoint below, or use 'upcoming' to see the next 8 games across all sports

const regions = 'us' // uk | us | eu | au. Multiple can be specified if comma delimited

const markets = 'h2h' // h2h | spreads | totals. Multiple can be specified if comma delimited

const oddsFormat = 'decimal' // decimal | american

const dateFormat = 'iso' // iso | unix

/*
    Now get a list of live & upcoming games for the sport you want, along with odds for different bookmakers
    This will deduct from the usage quota
    The usage quota cost = [number of markets specified] x [number of regions specified]
    For examples of usage quota costs, see https://the-odds-api.com/liveapi/guides/v4/#usage-quota-costs

*/
axios.get(`https://api.the-odds-api.com/v4/sports/${sportKey}/odds`, {
    params: {
        apiKey,
        regions,
        markets,
        oddsFormat,
        dateFormat,
    }
})
.then(response => {

    // Check your usage
    console.log('Remaining requests',response.headers['x-requests-remaining'])
    console.log('Used requests',response.headers['x-requests-used'])

    res.json({msg: "success", data: response.data})

})
.catch(error => {
    console.log('Error status', error.response.status)
    console.log(error.response.data)

    res.json({msg: "fail"})
})
  
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
  }
