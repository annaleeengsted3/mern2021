module.exports = (mongoose) => {
  const postSchema = new mongoose.Schema({
    title: String,
    topic: String,
    author: String,
    date: Date,
    votes: Number,
    comments: [{
      comment:String,
      author: String,
      votes: Number,
      date: Date 
      }],
  });

  const topicSchema = new mongoose.Schema({
    title: String
  });

  const postModel = mongoose.model('post', postSchema);
  const topicModel = mongoose.model('topic', topicSchema);

  const topics = ["TV", "News", "Funny", "Sports"]

  async function getPosts() {
    try {

      return await postModel.find();
    } catch (error) {
      console.error("getPosts:", error.message);
      return {};
    }
  }

  async function getTopics() {
    try {
      return await topicModel.find();
    } catch (error) {
      console.error("getTopics:", error.message);
      return {};
    }
  }

  async function getPost(id) {
    try {
      return await postModel.findById(id);
    } catch (error) {
      console.error("getPost:", error.message);
      return {};
    }
  }

  async function createPost(post) {
    console.log(post);
    let newPost = new postModel(post);
    return newPost.save();
  }
  

  async function updatePost(comment) {
    console.log("UPDATING POST");
    let postToUpdate =  await postModel.findById(comment._id);
    console.log(postToUpdate);
   if(comment.votes > 0){
      const commentToUpdate =postToUpdate.comments.find(post=> post.comment== post.comment)
commentToUpdate.votes = comment.votes;
   } else if(comment.votes === 0){
      postToUpdate.comments.push(comment)
   }
   
    postToUpdate.save();
    return postModel.findById(comment._id);
  }

  async function bootstrap(count = 10) {
    let l = (await getPosts()).length;
    console.log("Question collection size from bootstrap():", l);
//if there are no posts, create test data:
    if (l === 0) {
      let promises = [];
      let initQuestions= [
        {
        title:"Why didn't the eagles just fly the ring to mordor...", 
        topic: topics[0], 
        author: "lotr123", 
        date: new Date('2020-12-09'),
        votes: 23,
        comments:[{comment: "omg I can't even", votes: 23, author:"catlover", date: new Date("2020-12-10")}] 
        }, 
        {
        title:"What's going on with all the UFO articles", 
        topic: topics[1], 
        author: "thetruthisoutthere", 
        date: new Date('2021-01-09'),
        votes: 14,
        comments:[{comment: "even Obama admitted it", votes: 13, author:"area51", date: new Date("2020-01-10")}] 
        }, 
          {
            title:"Hehe check out this funny video", 
        topic: topics[2], 
        author: "notarickroll", 
        date: new Date('2021-03-23'),
        votes: 4,
        comments:[{comment: "nice", author:"nice123", votes: 23, date: new Date("2020-03-24")}] 
          }, 
          {
            title:"Any updates on Tokyo 2021", 
            topic: topics[3], 
            author: "sportsman", 
            date: new Date('2021-03-23'),
            votes: 2,
            comments:[{comment: "no idea", author:"nice123", votes: 9, date: new Date("2020-03-24")}] 
          }
          ]
      for (let i = 0; i < initQuestions.length; i++) {
        let newPost = new postModel(initQuestions[i]);
        console.log(i);
        promises.push(newPost.save());
      }

    
      return Promise.all(promises);
    }
  
    let t = (await getTopics()).length;
    if(t===0){
      let tv = new topicModel({title: topics[0]});
      tv.save();
      let news = new topicModel({title: topics[1]});
      news.save();
      let funny = new topicModel({title: topics[2]});
      funny.save();
      let sports = new topicModel({title: topics[3]});
      sports.save();

    }
  }

  return {
    getPosts: getPosts,
    getTopics: getTopics,
    getPost: getPost,
    createPost: createPost,
    updatePost: updatePost,
    bootstrap
  }
}