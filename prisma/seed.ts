
import {prisma} from '../src/database/database'

async function main() {
    await prisma.books.createMany({
        data: [
            {title: "O Poder do Hábito" , author: "Charles Duhigg", totalPages:	408},
            {title: "Cem anos de solidão" , author: "Gabriel Garcia Marquez", totalPages:352 },
            {title: "O filho de mil homens" , author: "Valter Hugo Mão", totalPages:280 },
            {title: "No seu pescoço" , author: "Chimamanda Ngozi Adichie", totalPages:254 },
            {title: "Uma aprendizagem ou o livro dos prazeres" , author: "Clarice Lispector", totalPages:160 },
            {title: "A redoma de vrido" , author: "Sylvia Plath", totalPages:260 },
            {title: "Sul da fronteira, oeste do sol" , author: "Haruki Murakami", totalPages:230 },
            {title: "Kafka a beira mar" , author: "Haruki Murakami", totalPages: 471 },
            {title: "Minha querida SPutnik" , author: "Haruki Murakami", totalPages: 229 },
            {title: "Torto arado" , author: "Itamar Vieira Junior", totalPages:262 },
            {title: "A única coisa" , author: "Gary Keller & Jay Papasan", totalPages:207 },
            
        ],
        skipDuplicates: true,
      });

}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });