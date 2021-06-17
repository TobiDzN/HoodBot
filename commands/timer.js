module.exports={
        name:'timer',
        description:"this is a timer command!",
        execute(message,args)
    {
     

    },
    getName(message,args)
    {
        return this.name;
    },
   getDescription(message,args)
   {
       return this.description;
   }
}