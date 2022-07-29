# FACEMASH - BUILT IN REACT

demo - 
![](screen-capture.gif)


## Features

- A replica of facemash original version with some extra styling
- Implemented based on Elo rating with a factor of k = 32
- Shuffling in non repeatedd random order by Fisher-yates algorithm

## Flow of the program

- First i did load all the image file dynamically in react by using process.env.PUBLIC_FOLDER. If any asset is present in public folder, we can access it dynamically instead of loading the image in the react
- Shuffle the order in a random order so that for each user that enter's our site, we get a different ordering and get a different set of rating which would drastically make it look more natural rather giving all the users the same set of order.
- compare each value with increasing index.
- when clicked on the picture, a ratingCalulator is invoked and rate system is done
- When all the comparision are finished, we can see the result of the rating or the user has ability to see it directly.

I personally avoided database in it, i wanted to make this project as neat as possible and use javascript.
Now that i grasp of how the flow would work, Its implementable in database with ease.

### How to run

Just run  -  npm start

There is no depency or extra library involved.

### Some Important Notes

Fisher - yates algorithm
--------------------------
```
for(let i=arr.length-1;i>0;i--){
  const j = Math.round(Math.random()*(i+1));
  const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp
}
```

Elo rating algorithm
----------------------
```
const calculateRating = (winner)=>{
    var pa = probability(p2Rating,p1Rating);
    var pb = probability(p1Rating,p2Rating);

    if(winner===1){
        let r1 = Math.floor(p1Rating+k*(1-pa));
        let r2 = Math.floor(p2Rating+k*(0-pb));
        p1Rating = r1;
      p2Rating = r2;

    }else if(winner===2){
      let r1 = Math.floor(p1Rating+k*(0-pa));
      let r2 = Math.floor(p2Rating+k*(1-pb));
      p1Rating = r1;
      p2Rating = r2;
    }
  }
 ```

