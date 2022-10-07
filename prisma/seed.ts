
import {prisma} from '../src/database/database'

async function main() {
    await prisma.books.createMany({
        data: [
            {title: "O Poder do Hábito" , author: "Charles Duhigg", totalPages:	408, synopsis:'O Poder do Hábito: por que fazemos o que fazemos na vida e nos negócios é um livro de Charles Duhigg, ex-repórter do New York Times, publicado em Fevereiro de 2012 pela Random House. Explora a ciência por trás da criação e reforma de hábitos.'},
            {title: "Cem anos de solidão" , author: "Gabriel Garcia Marquez", totalPages:352 , synopsis:"Cem Anos de Solidão é uma obra do escritor colombiano Gabriel García Márquez, Prêmio Nobel da Literatura em 1982, e é atualmente considerada uma das obras mais importantes da literatura latino-americana."},
            {title: "O filho de mil homens" , author: "Valter Hugo Mãe", totalPages:280 , synopsis:"O Filho de Mil Homens é um romance escrito por Valter Hugo Mãe, premiado autor português. O livro conta a história de Crisóstomo, um pescador que não teve sucesso no amor e deseja muito um filho"},
            {title: "No seu pescoço" , author: "Chimamanda Ngozi Adichie", totalPages:254 , synopsis:"Depois de Meio Sol Amarelo (Orange Prize 2007) e A Cor do Hibisco (Commonwealth Writers' Prize 2005), Chimamanda Ngozi Adichie regressa com doze histórias protagonizadas por heroínas memoráveis. Divididas entre dois continentes - África e América -, estas mulheres lutam por um lugar e uma identidade no mundo moderno mas também pela preservação dos valores da sua cultura de origem."},
            {title: "Uma aprendizagem ou o livro dos prazeres" , author: "Clarice Lispector", totalPages:160 , synopsis:"Uma aprendizagem ou O livro dos prazeres narra o processo de amadurecimento de Lóri, portanto, pode ser considerado como um romance de formação feminino, em que para aprender a personagem precisou desaprender a vergonha que tinha sobre o próprio corpo e sobre a proibição do prazer."},
            {title: "A redoma de vrido" , author: "Sylvia Plath", totalPages:260 , synopsis:"Talentosa e promissora, Esther Greenwood sai do subúrbio de Boston para trabalhar em uma prestigiosa revista de moda em Nova York. No momento de transição para uma vida cheia de responsabilidades e novos desafios, Esther entra em colapso devido ao desenvolvimento de um quadro depressivo."},
            {title: "Sul da fronteira, oeste do sol" , author: "Haruki Murakami", totalPages:230 , synopsis:"O livro Sul da fronteira, oeste do sol foi publicado originalmente em 1992 e tem seu nome baseado na música “South of the border”, de Nat King Cole. A trama acompanha e história de Hajime, jovem nascido no Japão pós-guerra que leva uma vida ordinária como revisor de livros didáticos. Certo dia, caminhando pelas ruas de Tóquio, ele avista Shimamoto, ex-namorada dos tempos de escola. Hajime decide segui-la, mas a mulher o despista ao entrar em um táxi. Logo depois, ele é abordado por um homem desconhecido que lhe entrega um pacote cheio de dinheiro e o ameaça para que não a siga nunca mais."},
            {title: "Kafka a beira mar" , author: "Haruki Murakami", totalPages: 471, synopsis:"Kafka Tamura é um solitário menino de quinze anos que decide fugir da casa do pai para escapar de uma terrível profecia, além de tentar encontrar a mãe e a irmã, que partiram quando ele ainda era criança. Leva poucos pertences numa mochila e não sabe nem ao menos que rumo seguir." },
            {title: "Minha querida SPutnik" , author: "Haruki Murakami", totalPages: 229, synopsis:"Em Minha Querida Sputnik, Murakami nos apresenta um Japão urbano de bares de jazz, cafés, Jack Kerouac e Beatles, numa trama que combina com mestria romance de mistério e filosofia, em uma instigante história de amor que conduz o leitor a uma profunda reflexão sobre o desejo humano." },
            {title: "Torto arado" , author: "Itamar Vieira Junior", totalPages:262 , synopsis:"Nas profundezas do sertão baiano, as irmãs Bibiana e Belonísia encontram uma velha e misteriosa faca na mala guardada sob a cama da avó. Ocorre então um acidente. E para sempre suas vidas estarão ligadas — a ponto de uma precisar ser a voz da outra."},
            {title: "A única coisa" , author: "Gary Keller & Jay Papasan", totalPages:207 , synopsis:"Um dos livros mais comentados da atualidade é A Única Coisa: o foco pode trazer resultados extraordinários para sua vida do autor Gary Keller. A obra  mostra de forma simples e direta passos para ter mais produtividade, através do propósito que estabelecemos em nossa vida. No artigo de hoje, vamos resumir um pouco das ideias do livro."},
            
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