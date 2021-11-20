import { Forum } from "../../types/Forum";
import { Thread } from "../../types/Thread";
import { LoremIpsum } from "lorem-ipsum";
import { ThreeSixty } from "@mui/icons-material";
const makeThread = (title: string, id: number): Thread=> {
    return (
        {
            id: id,
            title: title,
            description: "Hello world",
            messages: [],
            lastUpdated: new Date(),
        }
    )
}


const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });


function genData(): Array<Forum> {
    let arr = []
    let thrds = []
    for(var j = 0; j< 5; j++){
        thrds.push(makeThread('Halló heimur jdsksglsgsgslkgnsg,nslkg',j))
    }
    for(var i = 0; i < 17; i++){
        arr.push(
            {
                id: i,
                courseId: `test${i}`,
                name: `Hugbúnaðarverkefni${i}`,
                description: lorem.generateParagraphs(1),
                threads: thrds,
            }
        )
    }
    return arr
    
}
export const mockForums: Array<Forum> = genData()

