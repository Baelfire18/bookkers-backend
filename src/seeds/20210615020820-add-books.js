const models = require('../models');

const Book = models.book;
module.exports = {
  // up: async (queryInterface, Sequelize) => {
  up: async () => {
    const booksArray = [];

    booksArray.push({
      title: 'Percy Jackson: The Lightning Thief',
      isbn: '9786124497001',
      author: 'Rick Riordan',
      genre: 'Fantasy',
      userId: 1,
      description: 'Twelve-year-old Percy Jackson is on the most dangerous quest of his life. With the help of a satyr and a daughter of Athena, Percy must journey across the United States to catch a thief who has stolen the original weapon of mass destruction — Zeus’ master bolt. Along the way, he must face a host of mythological enemies determined to stop him. Most of all, he must come to terms with a father he has never known, and an Oracle that has warned him of betrayal by a friend.',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    booksArray.push({
      title: 'Percy Jackson: The Sea of Monsters',
      isbn: '9786124497002',
      author: 'Rick Riordan',
      genre: 'Fantasy',
      userId: 1,
      description: 'When Thalia’s tree is mysteriously poisoned, the magical borders of Camp Half-Blood begin to fail. Now Percy and his friends have just days to find the only magic item powerful to save the camp before it is overrun by monsters. The catch: they must sail into the Sea of Monsters to find it. Along the way, Percy must stage a daring rescue operation to save his old friend Grover, and he learns a terrible secret about his own family, which makes him question whether being the son of Poseidon is an honor or a curse.',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    booksArray.push({
      title: 'Percy Jackson: The Titan’s Curse',
      isbn: '9786124497003',
      author: 'Rick Riordan',
      genre: 'Fantasy',
      userId: 1,
      description: 'When Percy Jackson gets an urgent distress call from his friend Grover, he immediately prepares for battle. He knows he will need his powerful demigod allies at his side, his trusty bronze sword Riptide, and… a ride from his mom.',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    booksArray.push({
      title: 'Percy Jackson: The Battle of the Labyrinth',
      isbn: '9786124497004',
      author: 'Rick Riordan',
      genre: 'Fantasy',
      userId: 1,
      description: 'Percy Jackson isn’t expecting freshman orientation to be any fun, but when a mysterious mortal acquaintance appears, pursued by demon cheerleaders, things quickly go from bad to worse.',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    booksArray.push({
      title: 'Percy Jackson: The Last Olympian',
      isbn: '9786124497005',
      author: 'Rick Riordan',
      genre: 'Fantasy',
      userId: 1,
      description: 'All year the half-bloods have been preparing for battle against the Titans, knowing the odds of victory are grim. Kronos’s army is stronger than ever, and with every god and half-blood he recruits, the evil Titan’s power only grows.',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    booksArray.push({
      title: 'Red Dragon',
      isbn: '9786124497006',
      author: 'Thomas Harris',
      genre: 'Horror',
      userId: 3,
      description: 'The Silence of the Lambs gets all the attention, but the best Hannibal Lecter novel is still the first; a book that suggests the most horrifying of evils can grow from an all too human place, and that even heroes can carry something monstrous inside them. Every Lecter story on some level features an implicit Faustian bargain and none is more tragic than FBI crimimal profiler Will Graham’s knowing choice to sacrifice his own fragile peace of mind to stop a killer he understands all too well.',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    booksArray.push({
      title: 'The picture of Dorian Gray',
      isbn: '9786124497007',
      author: 'Oscar Wilde',
      genre: 'Horror',
      userId: 3,
      description: 'There are no real villains in Oscar Wilde’s first and only novel. The lurking danger of this book is our capacity for vanity and how it can literally and metaphorically disfigure us, how obsession with retaining beauty will inevitably lead to its destruction. Even Wilde’s central monster, Dorian himself, is more tragic idiot than conniving mastermind, a youthful dope consumed by a pathological belief that the only thing worth having is beauty at any cost. His descent would almost be funny if it wasn’t so chillingly believable.',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    booksArray.push({
      title: 'Horns',
      isbn: '9786124497008',
      author: 'Joe Hill',
      genre: 'Horror',
      userId: 3,
      description: 'Sometimes horror, even at its darkest, is the window dressing for something more tender. That’s the case with the unique and entirely enrapturing Horns, a book that starts out as a twisted revenge story before slowly becoming something more sprawling, knotty, and ultimately hopeful. Horns is by turns a gothic romance, a murder mystery, a supernatural thriller and a biting satire on how quick we can be to judge despite the darkness we all harbour.',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    booksArray.push({
      title: 'The Exorcist',
      isbn: '9786124497009',
      author: 'William Peter Blatty',
      genre: 'Horror',
      userId: 3,
      description: 'Often the best horror stories are the ones that believe, through all the death, jump-scares and creepiness, in the fundamental triumph of goodness. That The Exorcist was long considered one of the most terrifying novels ever is in large part is down to how deeply we are led to care about the desperate plight of its central characters, and how carefully detailed every one of them is. The evil they face is huge and incomprehensible, but not, in the end, insurmountable, and much of the book’s (and film’s) power comes from the ultimate hard-won victory of a small group who sacrifice everything for an innocent child.',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    booksArray.push({
      title: 'Psycho',
      isbn: '9786124497010',
      author: 'Robert Bloch',
      genre: 'Horror',
      userId: 3,
      description: 'To be clear, like Jaws, the film is better; Hitchcock having made a series of clever tweaks to find new ways of manipulating the audience by making them care. But everything that turned Psycho into an enduring cultural lightning rod originated in Bloch’s novel; the shower scene, the house on the hill, the twist ending and the sense of gothic dread dripping from every moment. The gleeful subversion of conventions that Hitchcock gets all the credit for originated here, and without this book, horror – and cinema – wouldn’t be the same.',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    booksArray.push({
      title: 'The Passage',
      isbn: '9786124497011',
      author: 'Justin Cronin',
      genre: 'Horror',
      userId: 3,
      description: 'Justin Cronin’s epic vampire saga is a sprawling tale of love, loss and societies destroyed, rebuilt and destroyed again, centred not only on characters we could care deeply for, but a slowly growing sense of insidious evil whispering from the shadows, a terror so unknowable that it was always going to lose a little menace once it was explained. But like the best horror writers, Cronin uses that inevitability to make his point – that all too often evil grows from a place that is a little more understandable than we might care to confront. The whole trilogy is fantastic, but for its singular atmosphere of growing dread the first will always be the best.',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    booksArray.push({
      title: 'Misery',
      isbn: '9786124497012',
      author: 'Stephen King',
      genre: 'Horror',
      userId: 3,
      description: 'There’s an intoxicating combination of anger, sadness and catharsis at the heart of Misery; a book written by an author trying to move away from horror only to find that his vast readership wouldn’t accept that. Cue the story of a writer literally held hostage by a fan torturing him into writing what she wants, facilitating the writer’s slow realisation that the genre he was so desperate to move on from may be the only one that’s right for him. It’s an intensely personal and ambivalent book, and one of the best explorations of the highs and lows of creativity ever written.',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return Book.bulkCreate(booksArray);
  },

  // down: async (queryInterface, Sequelize) => {
  down: async () => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
