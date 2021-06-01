module.exports = (mongoose) => {
    const userSchema = new mongoose.Schema({
      username: String,
      password: String,
    });

  
    const userModel = mongoose.model('user', userSchema);

  
    async function getUsers() {
      try {
  
        return await userModel.find();
      } catch (error) {
        console.error("getQuestion:", error.message);
        return {};
      }
    }
    
  
//     async function updatePost(post) {
//       let postToUpdate =  await userModel.findById(post._id);
//       if(post.votes > 0){
//         const answerToUpdate =postToUpdate.answers.find(answer=> answer.answer== post.answer)
//   answerToUpdate.votes = post.votes;
//       } else if(post.votes === 0){
//         postToUpdate.answers.push({answer: post.answer, votes: post.votes})
//       }
//       postToUpdate.save();
//       return userModel.findById(post._id);
//     }
  
    async function bootstrap(count = 10) {
      let l = (await getUsers()).length;
      console.log("Question collection size from bootstrap():", l);
  
      if (l === 0) {
        let promises = [];
        let initQuestions= [
          {
          username:"krdo", 
          password: "123"
          }, 
          {
            username:"admin", 
            password: "456"
          }, 
            {
                username:"user3", 
                password: "789"
            }
            ]
        for (let i = 0; i < initQuestions.length; i++) {
          let newUser = new userModel(initQuestions[i]);
          console.log(i);
          promises.push(newUser.save());
        }
       
        return Promise.all(promises);
      }
    
    }
  
    return {
      getUsers: getUsers,
      bootstrap
    }
  }