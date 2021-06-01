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
    //   let l = (await getUsers()).length;
    //   console.log("Question collection size from bootstrap():", l);
  
    //   if (l === 0) {
    //     let promises = [];
    //     let initQuestions= [
    //       {
    //       username:"krdo", 
    //       password: "123"
    //       }, 
    //       {
    //       title:"What's going on with all the UFO articles", 
    //       topic: topics[1], 
    //       author: "thetruthisoutthere", 
    //       date: new Date('2021-01-09'),
    //       votes: 14,
    //       comments:[{comment: "even Obama admitted it", author:"area51", date: new Date("2020-01-10")}] 
    //       }, 
    //         {
    //           title:"Hehe check out this funny video", 
    //       topic: topics[2], 
    //       author: "notarickroll", 
    //       date: new Date('2021-03-23'),
    //       votes: 4,
    //       comments:[{comment: "nice", author:"nice123", date: new Date("2020-03-24")}] 
    //         }, 
    //         {
    //           title:"Any updates on Tokyo 2021", 
    //           topic: topics[3], 
    //           author: "sportsman", 
    //           date: new Date('2021-03-23'),
    //           votes: 2,
    //           comments:[{comment: "no idea", author:"nice123", date: new Date("2020-03-24")}] 
    //         }
    //         ]
    //     for (let i = 0; i < initQuestions.length; i++) {
    //       let newPost = new userModel(initQuestions[i]);
    //       console.log(i);
    //       promises.push(newPost.save());
    //     }
    //     let tv = new topicModel({title: topics[0]});
    //     tv.save();
    //     let news = new topicModel({title: topics[1]});
    //     news.save();
    //     let funny = new topicModel({title: topics[2]});
    //     funny.save();
    //     let sports = new topicModel({title: topics[3]});
    //     sports.save();
    //     return Promise.all(promises);
    //   }
    
    }
  
    return {
      getPosts: getUsers,
      bootstrap
    }
  }