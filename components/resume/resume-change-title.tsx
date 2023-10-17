'use client';
import { Pencil, Save, X } from 'lucide-react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

interface ResumeChangeTitleProps {
  title: string;
  resumeId: string;
}
export default function ResumeChangeTitle({
  title,
  resumeId,
}: ResumeChangeTitleProps) {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const handleEdit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    if (currentTitle.trim() !== '') {
      const response = await fetch('/api/resume/editTitle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeTitle: currentTitle,
          resumeId: resumeId,
        }),
      });

      if (response.status == 200) {
        toast.success("Successfuly edited resume's title");
      } else {
        toast.error('Error has occured, Try again later');
      }
      setIsEditing(false);
    }
    setIsSaving(false);
  };
  return (
    <div className="w-full h-12 flex gap-x-2 items-center justify-center lg:justify-start">
      {isEditing ? (
        <>
          <input
            disabled={isSaving}
            className="rounded bg-transparent appearance-none px-2 h-full placeholder-slate-400 border border-slate-300 focus:border-slate-500 focus:ring-slate-500"
            type="text"
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.currentTarget.value)}
            placeholder={currentTitle}
          />
          <button
            disabled={isSaving}
            onClick={handleEdit}
            className={`${
              isSaving
                ? 'text-slate-500'
                : 'hover:bg-[#F7F7FF] hover:text-[#279AF1]'
            } w-12 h-12 rounded p-2  transition-all duration-300 ease-in-out flex items-center justify-center relative`}
          >
            <Save />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="w-12 h-12 rounded p-2 hover:bg-[#F7F7FF] hover:text-red-600 transition-all duration-300 ease-in-out flex items-center justify-center relative"
          >
            <X />
          </button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold">{currentTitle}</h3>
          <button
            onClick={() => setIsEditing(true)}
            className="w-12 h-12 rounded p-2 hover:bg-[#F7F7FF] hover:text-[#279AF1] transition-all duration-300 ease-in-out flex items-center justify-center relative"
          >
            <Pencil />
          </button>
        </>
      )}
    </div>
  );
}
