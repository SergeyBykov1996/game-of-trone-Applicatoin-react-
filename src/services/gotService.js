export default class GotService {

    
    
    constructor(){
        this._apiBase = 'https://www.anapioficeandfire.com/api'
    }

    async getResourse(url){

        const res = await fetch(`${this._apiBase}${url}`);
    
            if (!res.ok) {
                throw new Error(`could not fetch ${url}, status: ${res.status}`);
            }

        return await res.json();     
    };

    async getAllCharacters() {
        const res = await this.getResourse('/characters?page=5&pageSize=10')
        return res.map(this._transformCharacter);
    }
    async getCharacter(id) {
        const character = await this.getResourse(`/characters/${id}`)
        return this._transformCharacter(character);
    }

    getAllBooks() {
        return this.getResourse('/books/');
    }
    getBooks(id) {
        return this.getResourse(`/books/${id}`);
    }

    getAllHouse() {
        return this.getResourse('/houses/');
    }

    getHouse(id) {
        return this.getResourse(`/houses/${id}`);
    }

    _transformCharacter(char){                     //Трансформация персонажей
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }

    _transformHouse(house){
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released
        }
    }
}

// const got = new GotService();

// got.getAllCharacters()
//     .then(res => {
//         console.log(res.forEach (item => console.log(item.name)));
//     });  
    
// got.getCharacter(100)
//     .then(res => console.log(res));