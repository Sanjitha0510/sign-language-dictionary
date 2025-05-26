import './App.css';
import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './components/SearchBar';
import AddWordModal from './components/AddWordModal';
import EditWordModal from './components/EditWordModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import WordCard from './components/WordCard';
import LoadingSpinner from './components/LoadingSpinner';
import FloatingAddButton from './components/FloatingAddButton';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      searchQuery: "",
      word: "",
      definition: "",
      imageUrl: "",
      videoUrl: "",
      editingIndex: null,
      editWord: "",
      editDefinition: "",
      editImageUrl: "",
      editVideoUrl: "",
      loading: false,
      showAddModal: false,
      showDeleteModal: false,
      showEditModal: false,
      deleteWordName: "",
      originalWordName: ""
    };
  }

  API_URL = "http://localhost:5038/";

  componentDidMount() {
    this.fetchWords();
  }

  async fetchWords() {
    this.setState({ loading: true });
    fetch(this.API_URL + "words")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ words: data });
      })
      .catch((err) => {
        toast.error("Failed to fetch words");
        console.error(err);
      })
      .finally(() => this.setState({ loading: false }));
  }

  async addWord() {
    const { word, definition, imageUrl, videoUrl } = this.state;
    if (!word.trim() || !definition.trim()) {
      toast.error("Word and definition are required.");
      return;
    }
    const formData = new FormData();
    formData.append("word", word);
    formData.append("definition", definition);
    formData.append("imageUrl", imageUrl);
    formData.append("videoUrl", videoUrl);

    this.setState({ loading: true });
    fetch(this.API_URL + "words", {
      method: "POST",
      body: formData
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(result.message || result);
        this.setState({
          word: "",
          definition: "",
          imageUrl: "",
          videoUrl: "",
          showAddModal: false
        });
        this.fetchWords();
      })
      .catch((err) => {
        toast.error("Failed to add word");
        console.error(err);
      })
      .finally(() => this.setState({ loading: false }));
  }

  async deleteWord(word) {
    this.setState({ loading: true });
    fetch(this.API_URL + "words/" + word, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(result.message || result);
        this.fetchWords();
      })
      .catch((err) => {
        toast.error("Failed to delete word");
        console.error(err);
      })
      .finally(() => this.setState({ loading: false }));
  }

  async updateWord() {
    const { editWord, editDefinition, editImageUrl, editVideoUrl, originalWordName } = this.state;
    if (!editWord.trim() || !editDefinition.trim()) {
      toast.error("Word and definition are required.");
      return;
    }
    const formData = new FormData();
    formData.append("word", editWord);
    formData.append("definition", editDefinition);
    formData.append("imageUrl", editImageUrl);
    formData.append("videoUrl", editVideoUrl);

    this.setState({ loading: true });
    fetch(this.API_URL + "words/" + originalWordName, {
      method: "PUT",
      body: formData
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(result.message || result);
        this.setState({
          editingIndex: null,
          editWord: "",
          editDefinition: "",
          editImageUrl: "",
          editVideoUrl: "",
          showEditModal: false,
          originalWordName: ""
        });
        this.fetchWords();
      })
      .catch((err) => {
        toast.error("Failed to update word");
        console.error(err);
      })
      .finally(() => this.setState({ loading: false }));
  }

  async handleSearch() {
    const { searchQuery } = this.state;
    if (searchQuery.trim() === "") {
      this.fetchWords();
      return;
    }

    this.setState({ loading: true });
    
    try {
      const response = await fetch(this.API_URL + "words");
      const allWords = await response.json();
      
      const query = searchQuery.trim().toLowerCase();
      
      const matchingWords = allWords.filter(entry => {
        const word = entry.word.toLowerCase();
        const definition = entry.definition.toLowerCase();
        
        return word.includes(query) || definition.includes(query);
      });
      
      if (matchingWords.length > 0) {
        this.setState({ words: matchingWords });
      } else {
        toast.error("No words found matching your search");
        this.setState({ words: [] });
      }
    } catch (err) {
      toast.error("Search failed");
      console.error(err);
      this.setState({ words: [] });
    } finally {
      this.setState({ loading: false });
    }
  }

  showEditModal = (entry) => {
    this.setState({
      showEditModal: true,
      editWord: entry.word,
      editDefinition: entry.definition,
      editImageUrl: entry.imageUrl || "",
      editVideoUrl: entry.videoUrl || "",
      originalWordName: entry.word
    });
  };

  hideEditModal = () => {
    this.setState({
      showEditModal: false,
      editWord: "",
      editDefinition: "",
      editImageUrl: "",
      editVideoUrl: "",
      originalWordName: ""
    });
  };

  showDeleteConfirmation = (wordName) => {
    this.setState({
      showDeleteModal: true,
      deleteWordName: wordName
    });
  };

  hideDeleteConfirmation = () => {
    this.setState({
      showDeleteModal: false,
      deleteWordName: ""
    });
  };

  confirmDelete = () => {
    this.deleteWord(this.state.deleteWordName);
    this.hideDeleteConfirmation();
  };

  openAddModal = () => this.setState({ showAddModal: true });
  closeAddModal = () => this.setState({ showAddModal: false, word: "", definition: "", imageUrl: "", videoUrl: "" });

  render() {
    const { words, loading, showAddModal, showDeleteModal, showEditModal } = this.state;

    return (
      <div className="App">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <h2>SIGN LANGUAGE DICTIONARY</h2>

        {loading && <LoadingSpinner />}

        <SearchBar
          searchQuery={this.state.searchQuery}
          onSearchQueryChange={(query) => this.setState({ searchQuery: query })}
          onSearch={() => this.handleSearch()}
          onClear={() => {
            this.setState({ searchQuery: "" });
            this.fetchWords();
          }}
        />

        <FloatingAddButton onClick={this.openAddModal} />

        {showAddModal && (
          <AddWordModal
            word={this.state.word}
            definition={this.state.definition}
            imageUrl={this.state.imageUrl}
            videoUrl={this.state.videoUrl}
            onWordChange={(word) => this.setState({ word })}
            onDefinitionChange={(definition) => this.setState({ definition })}
            onImageUrlChange={(imageUrl) => this.setState({ imageUrl })}
            onVideoUrlChange={(videoUrl) => this.setState({ videoUrl })}
            onSubmit={() => this.addWord()}
            onClose={this.closeAddModal}
          />
        )}

        {showEditModal && (
          <EditWordModal
            word={this.state.editWord}
            definition={this.state.editDefinition}
            imageUrl={this.state.editImageUrl}
            videoUrl={this.state.editVideoUrl}
            onWordChange={(word) => this.setState({ editWord: word })}
            onDefinitionChange={(definition) => this.setState({ editDefinition: definition })}
            onImageUrlChange={(imageUrl) => this.setState({ editImageUrl: imageUrl })}
            onVideoUrlChange={(videoUrl) => this.setState({ editVideoUrl: videoUrl })}
            onSubmit={() => this.updateWord()}
            onClose={this.hideEditModal}
          />
        )}

        {showDeleteModal && (
          <DeleteConfirmationModal
            onConfirm={this.confirmDelete}
            onCancel={this.hideDeleteConfirmation}
          />
        )}

        <div className="words-container">
          {words.map((entry, index) => (
            <WordCard
              key={index}
              entry={entry}
              onEdit={() => this.showEditModal(entry)}
              onDelete={() => this.showDeleteConfirmation(entry.word)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
