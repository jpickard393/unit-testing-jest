import FootballTeam from "../src/Football"

const threeGamesWon = 3;

describe ('Football Team' ,()=>{
    it('Should return 3',()=>{
        const footballTeam = new FootballTeam(threeGamesWon);
        expect(footballTeam.getGamesWon).toBe(threeGamesWon);
    });

    it.each([[0],[1],[3],[10]])('should set gamesWon in constructor',(gamesWon)=>{
        const footballTeam = new FootballTeam(gamesWon);
        expect(footballTeam.getGamesWon()).toBe(gamesWon);
    })
});