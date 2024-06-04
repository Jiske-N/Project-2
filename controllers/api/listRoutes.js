const router = require('express').Router();
const { List } = require('../../models');


// Create a new list - GM
router.post("/", async (req, res) => {
    try {
        const newList = await List.create({ 
            name: req.body.listInput,
            board_id: req.body.board
         });
        res.status(200).json(newList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a list by ID - GM
router.put("/:id", async (req, res) => {
    try {
        await List.update({
            name: req.body.title,
        }, {
            where: {
                id: req.params.id
            }
        }).then((updatedList) => {
            res.json(updatedList)
        })
    } catch (err) {
        console.error(err)
    }
});

// Delete a list by ID - GM
router.delete("/:id",  (req, res) => {

    try {
        List.destroy({
           where: {
               id: req.params.id
           },
       })      .then((deletedList) => {
           res.json(deletedList);
         })
   } catch (err) {
       console.error(err)
   }
});

module.exports = router;