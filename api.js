const express = require('express');
const {createClient} = require('@supabase/supabase-js');
const { error } = require('node:console');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const supabase = createClient(process.env.SUPABASE_URI, process.env.SUPABASE_KEY);

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/players',async(rec,res)=>{
    const {name,score}= rec.body;
    if(!name || !score){
        return res.status(400).json({error:'need name'});
    }
    const {data,error} = await supabase
    .from('players')
    .insert([{name,score}]);
    if(error){
        console.log(error)
        return res.status(500).json(error)
    }
    return res.status(201).json({message:'funciona'});
    
})
app.get('/players', async (req, res) => {
  const { data, error } = await supabase
    .from('players')
    .select('*');

  if (error) {
    return res.status(500).json(error);
  }

  return res.json(data);
});


app.listen(PORT, ()=>{
    console.log(`Rodando no http://localhost:${PORT}/players`)
})
console.log(process.env.SUPABASE_URI)
