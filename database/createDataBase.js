const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// async function createDb() {
//     const connection = mysql.createConnection({
//         host: process.env.MYSQL_HOST,
//         user: process.env.MYSQL_USER,
//         password: process.env.MYSQL_PASSWORD
//     });
//     await connection.promise().query('CREATE DATABASE mydb');
// };

var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  //   port: process.env.PORT
});
function createTables() {
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        //create users table
        var createUsersTableQuery = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT ,  name VARCHAR(255) NOT NULL ,username VARCHAR(255) NOT NULL,email VARCHAR(255) NOT NULL,street VARCHAR(255),city VARCHAR(255),zipcode VARCHAR(255),phone VARCHAR(255),companyName VARCHAR(255),PRIMARY KEY(id,name))";
        con.query(createUsersTableQuery, function (err, result) {
            if (err) throw err;
            console.log("Table users created!");
        });
        //create todos table
        var createTodosTableQuery = "CREATE TABLE IF NOT EXISTS todos ( id INT AUTO_INCREMENT ,userId INT NOT NULL,title VARCHAR(255) NOT NULL,completed BOOLEAN NOT NULL,PRIMARY KEY (id) )";
        con.query(createTodosTableQuery, function (err, result) {
            if (err) throw err;
            console.log("Table todos created!");
        });
        //create comments table
        var createCommentsTableQuery = "CREATE TABLE IF NOT EXISTS comments (id INT AUTO_INCREMENT ,postId INT NOT NULL, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL,body TEXT NOT NULL,PRIMARY KEY (id))";
        con.query(createCommentsTableQuery, function (err, result) {
            if (err) throw err;
            console.log("Table created!");
        });
        //create posts table
        var createPostsTableQuery = "CREATE TABLE IF NOT EXISTS posts (id INT AUTO_INCREMENT ,userId INT NOT NULL,title VARCHAR(255) NOT NULL,body TEXT NOT NULL,PRIMARY KEY (id))";
        con.query(createPostsTableQuery, function (err, result) {
            if (err) throw err;
            console.log("Table created!");
        });
         //create password table
         var createPasswordTableQuery = "CREATE TABLE IF NOT EXISTS passwords (username VARCHAR(255) NOT NULL,password VARCHAR(255) NOT NULL,PRIMARY KEY (username))";
         con.query(createPasswordTableQuery, function (err, result) {
             if (err) throw err;
             console.log("Table created!");
         });
    });
}

// createDb();
createTables();
const postsData = [
    {
        userId: 1,
        title: "Amazing Day at the Beach",
        body: "Today I had an amazing day at the beach. The weather was perfect and the water was so refreshing!"
    },
    {
        userId: 2,
        title: "Hiking Adventure",
        body: "Went on a fantastic hiking adventure today! Explored some breathtaking trails and saw some stunning views."
    },
    {
        userId: 3,
        title: "Cooking Experiment",
        body: "Tried a new recipe today and it turned out great! Cooking is such a fun and rewarding hobby."
    },
    {
        userId: 4,
        title: "Exploring a New City",
        body: "Spent the day exploring a new city. Found some amazing cafes and shops. Can't wait to go back!"
    },
    {
        userId: 5,
        title: "Movie Night with Friends",
        body: "Had a great movie night with friends. Watched some classic films and had lots of laughs."
    },
    {
        userId: 6,
        title: "Baking Adventures",
        body: "Spent the afternoon baking cookies and cakes. The kitchen smells amazing!"
    },
    {
        userId: 7,
        title: "Picnic in the Park",
        body: "Had a lovely picnic in the park today. Enjoyed some delicious food and great company."
    },
    {
        userId: 8,
        title: "DIY Project",
        body: "Started a new DIY project today. Can't wait to see how it turns out!"
    },
    {
        userId: 9,
        title: "Gardening Day",
        body: "Spent the morning gardening. Love seeing my plants grow and thrive."
    },
    {
        userId: 10,
        title: "Reading Marathon",
        body: "Spent the weekend reading. Finished several books and started on a new one."
    },
    {
        userId: 11,
        title: "Beach Volleyball Tournament",
        body: "Took part in a beach volleyball tournament today. It was so much fun!"
    },
    {
        userId: 12,
        title: "Painting Workshop",
        body: "Attended a painting workshop and learned some new techniques. Can't wait to try them out at home."
    },
    {
        userId: 13,
        title: "Family Barbecue",
        body: "Had a family barbecue today. Ate lots of delicious food and enjoyed spending time together."
    }
];
const commentsData = [
    {
        postId: 1,
        name: "id labore ex et quam laborum",
        email: "Eliseo@gardner.biz",
        body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
    },
    {
        postId: 2,
        name: "asperiores ea ipsam voluptatibus modi minima quia sint",
        email: "Donna@frederik.com",
        body: "ut harum aliquid vitae\nimpedit sint officiis sint consequatur quibusdam in\nest adipisci quibusdam inventore quia id magni quas enim"
    },
    {
        postId: 3,
        name: "repellat aliquid praesentium dolorem quo",
        email: "Rigoberto@alysha.tv",
        body: "maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor"
    },
    {
        postId: 4,
        name: "maiores sed dolores similique labore et inventore et",
        email: "Chad@aric.biz",
        body: "ut harum aliquid vitae\nimpedit sint officiis sint consequatur quibusdam in\nest adipisci quibusdam inventore quia id magni quas enim"
    },
    {
        postId: 5,
        name: "reprehenderit est deserunt velit ipsam",
        email: "Julianne.OConner@kory.org",
        body: "maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor"
    },
    {
        postId: 6,
        name: "unde et ut molestiae est molestias voluptatem sint",
        email: "Lucio@gladys.tv",
        body: "ut harum aliquid vitae\nimpedit sint officiis sint consequatur quibusdam in\nest adipisci quibusdam inventore quia id magni quas enim"
    },
    {
        postId: 7,
        name: "qui autem adipisci veritatis iure necessitatibus",
        email: "Odell@demond.biz",
        body: "maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor"
    },
    {
        postId: 8,
        name: "distinctio vitae autem nihil ut molestias quo",
        email: "Gussie@leroy.io",
        body: "ut harum aliquid vitae\nimpedit sint officiis sint consequatur quibusdam in\nest adipisci quibusdam inventore quia id magni quas enim"
    },
    {
        postId: 9,
        name: "et itaque necessitatibus maxime molestiae qui quas velit",
        email: "Osbaldo@victor.io",
        body: "maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor"
    },
    {
        postId: 10,
        name: "adipisci non ad dicta qui amet quaerat doloribus ea",
        email: "Rosalyn@marie.org",
        body: "ut harum aliquid vitae\nimpedit sint officiis sint consequatur quibusdam in\nest adipisci quibusdam inventore quia id magni quas enim"
    },
    {
        postId: 11,
        name: "voluptas cupiditate voluptatem quos possimus exercitationem exercitationem",
        email: "Karine@jadyn.tv",
        body: "maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor"
    },
    {
        postId: 12,
        name: "dolor veritatis ipsum accusamus quae voluptates sint voluptatum et",
        email: "Nathanael@jada.org",
        body: "ut harum aliquid vitae\nimpedit sint officiis sint consequatur quibusdam in\nest adipisci quibusdam inventore quia id magni quas enim"
    },
    {
        postId: 13,
        name: "quia molestiae repellendus expedita quis consequatur enim",
        email: "Domenic.Durgan@joaquin.name",
        body: "maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor"
    },
    {
        postId: 14,
        name: "perferendis magnam natus exercitationem eveniet sunt",
        email: "Rhett.OKon@brian.org",
        body: "ut harum aliquid vitae\nimpedit sint officiis sint consequatur quibusdam in\nest adipisci quibusdam inventore quia id magni quas enim"
    },
    {
        postId: 15,
        name: "veritatis quibusdam delectus sint autem quidem",
        email: "Mathias@richmond.info",
        body: "maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor"
    },
    {
        postId: 16,
        name: "qui explicabo molestiae dolorem",
        email: "Ottis@loura.biz",
        body: "ut harum aliquid vitae\nimpedit sint officiis sint consequatur quibusdam in\nest adipisci quibusdam inventore quia id magni quas enim"
    },
];
const todosData = [
    { userId: 1,  title: "delectus aut autem", completed: false },
    { userId: 2, title: "quis ut nam facilis et officia qui", completed: false },
    { userId: 3, title: "fugiat veniam minus", completed: false },
    { userId: 4, title: "et porro tempora", completed: true },
    { userId: 5, title: "laboriosam mollitia et enim quasi adipisci quia provident illum", completed: false },
    { userId: 6,  title: "qui ullam ratione quibusdam voluptatem quia omnis", completed: false },
    { userId: 7, title: "illo expedita consequatur quia in", completed: false },
    { userId: 8, title: "quo adipisci enim quam ut ab", completed: true },
    { userId: 9,  title: "molestiae perspiciatis ipsa", completed: false },
    { userId: 10,  title: "illo est ratione doloremque quia maiores aut", completed: true },
    { userId: 11,  title: "vero rerum temporibus dolor", completed: true },
    { userId: 12, title: "ipsa repellendus fugit nisi", completed: true },
    { userId: 13,  title: "et doloremque nulla", completed: false },
    { userId: 14,  title: "repellendus sunt dolores architecto voluptatum", completed: true },
    { userId: 15, title: "ab voluptatum amet voluptas", completed: true },
    { userId: 16,  title: "accusamus eos facilis sint et aut voluptatem", completed: true },
    { userId: 17, title: "quo laboriosam deleniti aut qui", completed: true },
    { userId: 18,  title: "dolorum est consequatur ea mollitia in culpa", completed: false },
    { userId: 19,title: "molestiae ipsa aut voluptatibus pariatur dolor nihil", completed: true },
    { userId: 20,  title: "ullam nobis libero sapiente ad optio sint", completed: true },
    { userId: 21,  title: "suscipit repellat esse quibusdam voluptatem incidunt", completed: false },
    { userId: 22,  title: "distinctio vitae autem nihil ut molestias quo", completed: true },
    { userId: 23, title: "et itaque necessitatibus maxime molestiae qui quas velit", completed: false },
    { userId: 24,  title: "adipisci non ad dicta qui amet quaerat doloribus ea", completed: false },
    { userId: 25,  title: "voluptas quo tenetur perspiciatis explicabo natus", completed: true },
    { userId: 26,title: "aliquam aut quasi", completed: true },
    { userId: 27,  title: "veritatis pariatur delectus", completed: true },
    { userId: 28, title: "nesciunt totam sit blanditiis sit", completed: false },
    { userId: 29,  title: "laborum aut in quam", completed: false },
    { userId: 30,title: "nemo perspiciatis repellat ut dolor libero commodi blanditiis omnis", completed: true }
  ];
  const usersData = [
    { name: "John Doe", username: "john_doe", email: "john.doe@example.com", street: "123 Main Street", city: "New York", zipcode: "10001", phone: "555-1234", website: "johndoe.com", companyName: "Doe Corp" },
    { name: "Jane Smith", username: "jane_smith", email: "jane.smith@example.com", street: "456 Elm Street", city: "Los Angeles", zipcode: "90001", phone: "555-5678", website: "janesmith.com", companyName: "Smith Inc" },
    { name: "David Brown", username: "david_brown", email: "david.brown@example.com", street: "789 Oak Street", city: "Chicago", zipcode: "60601", phone: "555-9101", website: "davidbrown.com", companyName: "Brown Co" },
    { name: "Sarah Johnson", username: "sarah_johnson", email: "sarah.johnson@example.com", street: "321 Maple Street", city: "Houston", zipcode: "77001", phone: "555-1122", website: "sarahjohnson.com", companyName: "Johnson Enterprises" },
    { name: "Michael Williams", username: "michael_williams", email: "michael.williams@example.com", street: "654 Pine Street", city: "Philadelphia", zipcode: "19019", phone: "555-3344", website: "michaelwilliams.com", companyName: "Williams Ltd" },
    { name: "Emily Brown", username: "emily_brown", email: "emily.brown@example.com", street: "987 Cedar Street", city: "Phoenix", zipcode: "85001", phone: "555-5566", website: "emilybrown.com", companyName: "Brown Enterprises" },
    { name: "Daniel Miller", username: "daniel_miller", email: "daniel.miller@example.com", street: "741 Birch Street", city: "San Antonio", zipcode: "78201", phone: "555-7788", website: "danielmiller.com", companyName: "Miller Co" },
    { name: "Olivia Davis", username: "olivia_davis", email: "olivia.davis@example.com", street: "852 Walnut Street", city: "San Diego", zipcode: "92101", phone: "555-9900", website: "oliviadavis.com", companyName: "Davis Inc" },
    { name: "William Wilson", username: "william_wilson", email: "william.wilson@example.com", street: "963 Cherry Street", city: "Dallas", zipcode: "75201", phone: "555-1122", website: "williamwilson.com", companyName: "Wilson Enterprises" },
    { name: "Isabella Taylor", username: "isabella_taylor", email: "isabella.taylor@example.com", street: "159 Peach Street", city: "San Jose", zipcode: "95101", phone: "555-3344", website: "isabellataylor.com", companyName: "Taylor Ltd" },
    { name: "Joseph Smith", username: "joseph_smith", email: "joseph.smith@example.com", street: "234 Oak Street", city: "San Francisco", zipcode: "94101", phone: "555-5566", website: "josephsmith.com", companyName: "Smith Inc" },
    { name: "Karen Smith", username: "karen_smith", email: "karen.smith@example.com", street: "345 Maple Street", city: "San Francisco", zipcode: "94101", phone: "555-5566", website: "karensmith.com", companyName: "Smith Inc" },
    { name: "Jennifer Smith", username: "jennifer_smith", email: "jennifer.smith@example.com", street: "456 Elm Street", city: "Los Angeles", zipcode: "90001", phone: "555-5678", website: "jennifersmith.com", companyName: "Smith Inc" },
    { name: "Kim Smith", username: "kim_smith", email: "kim.smith@example.com", street: "567 Cherry Street", city: "Dallas", zipcode: "75201", phone: "555-1122", website: "kimsmith.com", companyName: "Smith Inc" },
    { name: "Lisa Smith", username: "lisa_smith", email: "lisa.smith@example.com", street: "678 Peach Street", city: "San Jose", zipcode: "95101", phone: "555-3344", website: "lisasmith.com", companyName: "Smith Inc" },
    { name: "Sarah Smith", username: "sarah_smith", email: "sarah.smith@example.com", street: "789 Oak Street", city: "Houston", zipcode: "77001", phone: "555-1122", website: "sarahsmith.com", companyName: "Smith Inc" }
  ];

  
function insertData() {
    // Create new posts

    // for (let i = 0; i < postsData.length; i++) {
    //     const postData = postsData[i];
    //     var createPostsQuery = "INSERT INTO posts ( userId,  title, body) VALUES ( ?, ?, ?)";
    //     var values = [postData.userId,  postData.title, postData.body];
    //     con.query(createPostsQuery, values, function (err, result) {
    //         if (err) throw err;
    //         console.log("Post " + (i + 1) + " inserted");
    //     });
    // }
    // Create new comments
    // for (let i = 0; i < commentsData.length; i++) {
    //     const comment = commentsData[i];
    //     var createCommentsQuery = "INSERT INTO comments ( postId, name, email, body) VALUES ( ?, ?, ?, ?)";
    //     var values = [comment.postId, comment.name, comment.email, comment.body];
    //     con.query(createCommentsQuery, values, function (err, result) {
    //         if (err) throw err;
    //         console.log("Comment " + (i + 1) + " inserted");
    //     });
    // }
    // Create new todos
    // for (let i = 0; i < todosData.length; i++) {
    //     const todo = todosData[i];
    //     var createTodosQuery = "INSERT INTO todos (userId,  title, completed) VALUES ( ?, ?, ?)";
    //     var values = [todo.userId, todo.title, todo.completed];
    //     con.query(createTodosQuery, values, function (err, result) {
    //         if (err) throw err;
    //         console.log("Todo " + (i + 1) + " inserted");
    //     });
    // }
    // Create new users
    // for (let i = 0; i < usersData.length; i++) {
    //     const user = usersData[i];
    //     var createUsersQuery = "INSERT INTO users (name, username, email, street, city, zipcode, phone, companyName) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    //     var values = [user.name, user.username, user.email, user.street, user.city, user.zipcode, user.phone, user.companyName];
    //     con.query(createUsersQuery, values, function (err, result) {
    //         if (err) throw err;
    //         console.log("User " + (i + 1) + " inserted");
    //     });
    // }
    for (let i = 0; i < usersData.length; i++) {
        const user = usersData[i];
        var createUsersQuery = "INSERT INTO passwords (username,website) VALUES (?, ?)";
        var values = [user.username,user.website];
        con.query(createUsersQuery, values, function (err, result) {
            if (err) throw err;
            console.log("User " + (i + 1) + " inserted");
        });
    }
}
// insertData();