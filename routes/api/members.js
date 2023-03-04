const express = require('express')
const router = express.Router();
const uuid = require('uuid');
const members = require('../../Members') ;
//Get All members
router.get('/' , (req,res) =>res.json(members));

//GEt single member 
router.get('/:id', (req,res) =>{
  var ident = req.params.id ;
  const found = members.some(member => member.id === parseInt(ident))

  if (found){
    res.json(members.filter(member => member.id === parseInt(ident)))
  }
  else {
    res.status(400).json({msg : `Member ${ident} is not found`})
  }
});

// Create Member
router.post('/post/', (req,res)=>{
    const newMember = {
        id : uuid.v4(),
        name:req.body.name, 
        email : req.body.email,
        status : 'active'
    }  
    
    if(!newMember.name || !newMember.email){
       return res.status(400).json({msg : "name not included"})
    }
    members.push(newMember);
    res.json(members);
});

// Update Member
router.put('/update/:id',(req,res) =>{
    var ident = req.params.id ;
    const found = members.some(member => member.id === parseInt(ident)) ; 

    if(found){
        const updMember = req.body; 
        members.forEach(member =>{
            if(member.id=== parseInt(ident))
             member.name = updMember.name ? updMember.name : member.name;
             member.email = updMember.email ? updMember.email : member.email;

             res.json({ msg : 'Member updated',member});
            })
    }
    else{
        res.status(400).json({msg : `Id ${ident} dont exist `})
    }
});


// Delete Member 
router.delete('/delete/:id', (req,res) =>{
    var ident = req.params.id ;
    const found = members.some(member => member.id === parseInt(ident));
    /*if(found){     
        const ident = req.params.id;
        const delMember = members[ident];
        const delMemberIndex = members.indexOf(delMember);
        members.splice(delMemberIndex, 1); 
        res.json({msg : `Member ${delMember} deleted succefully `})                                             
    }*/
    if(found){
        res.json({msg : ' Member deleted ', 
        members: members.filter(member => member.id !== parseInt(ident))})
    }
    else {
        res.status(400).json({msg : `Member ${ident} is not found` })
    }
});

module.exports = router ;       