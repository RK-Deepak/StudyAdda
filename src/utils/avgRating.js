export default function GetAvgRating(ratings)
{
    if(ratings?.length===0) return 0;

    const totalReviewCount=ratings?.reduce((acc,curr)=>
    {
        acc+=curr.rating;;
        return acc;

    },0)

    const multiplier=Math.pow(10,1);
    const avgReviewCount=Math.round((totalReviewCount/ratings?.length)*multiplier)/multiplier;

    return avgReviewCount;
}