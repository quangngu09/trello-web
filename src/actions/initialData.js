export const initialData = {
  boards: [
    {
      id: 'board-1',
      columnOrder: ['column-1', 'column-2', 'column-3'],
      columns: [
        {
          id: 'column-1',
          boardId: 'board-1',
          title: 'to do column',
          cardOrder: ['card-1', 'card-2', 'card-3','card-4','card-5','card-6','card-7','card-8'],
          cards: [
            {
              id: 'card-1', 
              boardId: 'board', 
              columnId: 'column-1', 
              title: "Title of card 1",
              cover: 'https://scontent.fhan2-3.fna.fbcdn.net/v/t1.6435-9/115931985_992575664500121_4036679232503007267_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=174925&_nc_ohc=XzL999VfT5cAX-lTtGd&_nc_ht=scontent.fhan2-3.fna&oh=dba417ae2eda12ca7db736f3b8e1ff93&oe=615342F7'
            },
            { id: 'card-2', boardId: 'board', columnId: 'column-1', title: "Title of card 2", cover: null },
            { id: 'card-3', boardId: 'board', columnId: 'column-1', title: "Title of card 3", cover: null },
            { id: 'card-4', boardId: 'board', columnId: 'column-1', title: "Title of card 4", cover: null },
            { id: 'card-5', boardId: 'board', columnId: 'column-1', title: "Title of card 5", cover: null },
            { id: 'card-6', boardId: 'board', columnId: 'column-1', title: "Title of card 6", cover: null },
            { id: 'card-7', boardId: 'board', columnId: 'column-1', title: "Title of card 7", cover: null },
            { id: 'card-8', boardId: 'board', columnId: 'column-1', title: "Title of card 8", cover: null },

          ]
        },
        {
          id: 'column-2',
          boardId: 'board-1',
          title: 'Inprogress column',
          cardOrder: ['card-9', 'card-10', 'card-11'],
          cards: [
            { id: 'card-9', boardId: 'board', columnId: 'column-1', title: "Title of card 9", cover: null },
            { id: 'card-10', boardId: 'board', columnId: 'column-1', title: "Title of card 10", cover: null },
            { id: 'card-11', boardId: 'board', columnId: 'column-1', title: "Title of card 11", cover: null },

          ]
        },
        {
          id: 'column-3',
          boardId: 'board-1',
          title: 'Done column',
          cardOrder: ['card-12', 'card-13', 'card-14'],
          cards: [
            { id: 'card-12', boardId: 'board', columnId: 'column-1', title: "Title of card 12", cover: null },
            { id: 'card-13', boardId: 'board', columnId: 'column-1', title: "Title of card 13", cover: null },
            { id: 'card-14', boardId: 'board', columnId: 'column-1', title: "Title of card 14", cover: null },

          ]
        }
      ],
    }
  ]
}