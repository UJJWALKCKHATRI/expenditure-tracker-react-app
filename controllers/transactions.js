const Transaction = require('../models/Transaction')

exports.getTransactions = async (req,res, next)=>{
   try{
        const transactions = await Transaction.query();

        return res.status(200).json({
           success: true,
           count: transactions.length,
           data: transactions

        });
   } catch(err){
        return res.status(500).json({
            success: false,
            error : 'Server Error'
        })
   }
}

exports.addTransactions = async (req,res, next)=>{
  try {
    const { text, amount } = req.body;

    const transaction = await Transaction.query().insertAndFetch(req.body);
    return res.status(201).json({
        success:true,
        data: transaction
    });
  } catch (err) {
      console.log(err)
     if(err.name === 'ValidationError'){
         const messages = Object.values(err.errors).map(val => val.message);
         return res.status(400).json({
             success: false,
             error: messages
         });

     }else{
         return res.status(500).json({
             success:false,
             error: 'Server Error'
         });
     }
  }
}

exports.deleteTransactions = async (req,res, next)=>{
    try {
        const {id} = req.params
        console.log(id)
        const transaction = await Transaction.query().findById(id);

        if(!transaction){
            return res.status(404).json({
                success:false,
                error:'No transaction found'
            });
        }
        await Transaction.query().deleteById(id);
        return res.status(200).json({
            success:true,
            data: {}
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            error: 'Server Error'
        }); 
    }
}
