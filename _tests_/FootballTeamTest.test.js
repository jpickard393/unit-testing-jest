import FootballTeam from "../src/Football"

const threeGamesWon = 3;

describe ('Football Team' ,()=>{
    it('Should return 3',()=>{
        const footballTeam = new FootballTeam(threeGamesWon);
        expect(footballTeam.getGamesWon()).toBe(threeGamesWon);
    });
});