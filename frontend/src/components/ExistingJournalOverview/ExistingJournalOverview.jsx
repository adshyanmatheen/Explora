import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import {CircleX, SquarePen, CircleCheck } from "lucide-react";

const ExistingJournalOverview = () => {
 const [journals, setJournals] = useState([]);
 const [editingJournalId, setEditingJournalId] = useState(null);
 const [deletingJournalId, setDeletingJournalId] = useState(null);
 const [editingJournal, setEditingJournal] = useState({ title: '', content: '' });

 useEffect(() => {
    const fetchJournals = async () => {
      const journalCollectionRef = collection(firestore, "Journal");
      const journalSnapshot = await getDocs(journalCollectionRef);
      const journalList = journalSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setJournals(journalList);
    };

    fetchJournals();
 }, []);

 const handleEdit = (journalId, journal) => {
    setEditingJournalId(journalId);
    setEditingJournal(journal);
 };

 const handleDelete = async (journalId) => {
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
      const journalDocRef = doc(firestore, "Journal", journalId);
      await deleteDoc(journalDocRef);
      setJournals(journals.filter(journal => journal.id !== journalId));
    }
 };

 const handleSave = async (journalId) => {
    const journalDocRef = doc(firestore, "Journal", journalId);
    await updateDoc(journalDocRef, editingJournal);
    setJournals(journals.map(journal => journal.id === journalId ? { ...journal, ...editingJournal } : journal));
    setEditingJournalId(null);
 };

 return (
    <div className="mx-auto max-w-lg rounded-3xl bg-white p-7 px-7 py-7 mobile:mx-auto mobile:max-w-sm md:max-w-lg md:p-10 md:px-11 md:py-11 lg:max-w-2xl dark:bg-black">
      <h1 className="pb-10 text-center font-primary font-semibold uppercase tracking-wider mobile:text-2xl sm:text-2xl md:text-3xl lg:text-4xl dark:text-white">
        Welcome To Journal
      </h1>
      <h2 className="pb-12 text-center font-primary mobile:text-base sm:text-base md:text-lg lg:text-xl xl:text-xl dark:text-white">
        See Your Past Journal Entries
      </h2>
      <div className="flex flex-col">
        {journals.map((journal) => (
          <div key={journal.id} className="mb-4 p-4 border rounded-lg">
            {editingJournalId === journal.id ? (
              <>
                <input
                 type="text"
                 value={editingJournal.title}
                 onChange={(e) => setEditingJournal({ ...editingJournal, title: e.target.value })}
                 placeholder="Title"
                 className="font-primary text-lg outline-none mobile:text-base sm:text-base md:text-base lg:text-lg xl:text-lg dark:bg-black dark:text-white"
                />
                <textarea
                 value={editingJournal.content}
                 onChange={(e) => setEditingJournal({ ...editingJournal, content: e.target.value })}
                 placeholder="Content"
                 className="font-primary text-lg outline-none mobile:text-base sm:text-base md:text-base lg:text-lg xl:text-lg dark:bg-black dark:text-white"
                />
                <button onClick={() => handleSave(journal.id)} className='className="text-black hover:text-getstarted-dark dark:text-white'><CircleCheck className="h-6 w-6 mobile:h-5 mobile:w-5 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-6 xl:w-6 dark:text-white" /></button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold dark:text-white">{journal.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">{journal.content}</p>
                <div className='pt-3 flex'>
                <div className='flex'>
                <button onClick={() => handleEdit(journal.id, journal)} className='text-black hover:text-getstarted-dark dark:text-white'><SquarePen className="h-6 w-6 mobile:h-5 mobile:w-5 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-6 xl:w-6" /></button>
                </div>
                <div className='flex pl-2'>
                <button onClick={() => handleDelete(journal.id)} className='text-red-500 hover:text-red-400 dark:text-red-400 dark:hover:text-red-300'><CircleX className="h-6 w-6 mobile:h-5 mobile:w-5 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-6 xl:w-6" /></button>
                </div>
                </div>
              </>
            )}
            {journal.images && journal.images.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Journal entry ${journal.title}`} className="mt-2 w-full h-auto" />
            ))}
          </div>
        ))}
      </div>
    </div>
 );
};

export default ExistingJournalOverview;
