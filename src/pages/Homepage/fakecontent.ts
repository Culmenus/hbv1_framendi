import { Forum } from "../../types/Forum";
import { Thread } from "../../types/Thread";
import { LoremIpsum } from "lorem-ipsum";
import {Message} from "../../types/Message";
import { User } from "../../types/User";
import { Role } from "../../types/Role";
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
    for(var j = 0; j< 20; j++){
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


const tempUser: User = {
    id: 1,
    username: 'Nati',
    password: 'ermagerd',
    email: 'nati@nati.is',
    favouriteForums: [],
    userRole: Role.User,
  }

function genFakeMesages(): Array<Message> {
    let arr = []

    for(var i = 0; i < 5; i++){
        arr.push({
            id: i,
            message: lorem.generateSentences(2),
            isEdited: false,
            sentBy: tempUser,
        })
    }
    return arr
}

export const FakeMessages: Array<Message> = genFakeMesages();
