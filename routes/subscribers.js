const express = require('express');
// const subscriber = require('../models/subscriber');
const router = express.Router();
const Subscriber = require('../models/subscriber');

//get all 
router.get( '/', async (req, res) => {

    try{
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    }
    catch (err){
            res.status(500).json({ message: err.message })
    }
})

//get one 
router.get('/:id', getSubscriber,(req, res) => {
    res.json(res.subscribers)
})

//create one

router.post('/', async (req, res) =>{

const subscribers = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
})

try{
    const newSubscriber = await subscribers.save()
    res.status(201).json(newSubscriber);
} catch (err) {
    res.status(400).json({
        message: err.message
    })
}

})

// update one 

router.patch('/:id', getSubscriber, async (req, res) =>{

    if(req.body.name !=  null){
        res.subscribers.name = req.body.name;
    }

    if(req.body.subscribedToChannel != null){
        res.subscribers.subscribedToChannel = req.body.subscribedToChannel;
    }

    try{

        const updatedSubscriber = await res.subscribers.save()
        res.json(updatedSubscriber)

    } catch (err){
        res.status(400).json({
            message: err.message
        })
    }
})

// delete one

router.delete('/:id', getSubscriber, async (req, res) =>{

    try{
        await res.subscribers.remove()
            res.json({ message: 'Deleted subscriber'})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
    
})


async function getSubscriber(req, res, next){
        let subscribers
    try{
        subscribers = await Subscriber.findById(req.params.id)
        if (subscribers == null){
            return res.status(404).json({ message: "Cannot find the subscriber" })
        }
    } catch (err) {
            return res.status(500).json({ message: err.message })
    }
   res.subscribers = subscribers
   next()
}

module.exports = router;