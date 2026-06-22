import React, { useState } from 'react';
import { 
  HiOutlineHeart, 
  HiHeart, 
  HiOutlineChatBubbleLeft, 
  HiOutlineShare, 
  HiOutlineMap, 
  HiPaperAirplane 
} from 'react-icons/hi2';

export default function LatestPost({ tag, categoryColor, title, text, author, date, location, image, initialLikes, commentCount }) {
  const avatarLetter = author ? author.charAt(0) : 'U';

  // 1. Interaction & Engagement States
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(parseInt(initialLikes) || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(
    commentCount > 0 
      ? [
          {
            author: 'Current User',
            date: '21/06/2026',
            text: 'hiiii',
            avatarBg: 'bg-[#00C853]'
          }
        ]
      : []
  );

  const handleLike = () => {
    if (liked) {
      setLikes(prev => prev - 1);
    } else {
      setLikes(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const input = e.target.commentText;
    const textContent = input.value.trim();
    if (!textContent) return;

    const newComment = {
      author: 'Fathima', 
      date: new Date().toLocaleDateString('en-GB'),
      text: textContent,
      avatarBg: 'bg-gradient-to-br from-[#155DFC] to-[#9810FA]'
    };

    setComments([...comments, newComment]);
    input.value = '';
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col text-left">
      
      {/* SECTION 1: Header Meta Info */}
      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm select-none">
            {avatarLetter}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">{author}</h4>
            <p className="text-[11px] text-slate-400 font-semibold">{date} • {location}</p>
          </div>
        </div>
        <span className={`px-3 py-1 text-[11px] font-bold rounded-full border ${categoryColor} uppercase tracking-wider`}>
          {tag}
        </span>
      </div>

      {/* SECTION 2: Text Content Body */}
      <div className="space-y-1">
        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">{text}</p>
      </div>

      {/* SECTION 3: Optional Image Attachment */}
      {image && (
        <div className="w-full mt-4 rounded-2xl overflow-hidden border border-slate-100 max-h-[320px]">
          <img src={image} alt="Attachment" className="w-full h-full object-cover" />
        </div>
      )}

      {/* SECTION 4: Integrated Post Action Toolbar */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4 text-slate-500 text-xs font-semibold select-none">
        <div className="flex items-center space-x-6">
          
          {/* Like/Upvote Trigger */}
          <button 
            onClick={handleLike}
            className={`flex items-center space-x-2 hover:text-rose-600 transition-colors duration-200 cursor-pointer ${liked ? 'text-rose-600' : ''}`}
          >
            {liked ? <HiHeart className="w-4 h-4 text-rose-500 fill-rose-500" /> : <HiOutlineHeart className="w-4 h-4 stroke-[2.2]" />}
            <span>{likes}</span>
          </button>

          {/* Comments Toggle Trigger */}
          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
          >
            <HiOutlineChatBubbleLeft className="w-4 h-4 stroke-[2.2]" />
            <span>{comments.length}</span>
          </button>

          {/* Share Trigger */}
          <button className="flex items-center space-x-2 hover:text-purple-600 transition-colors duration-200 cursor-pointer">
            <HiOutlineShare className="w-4 h-4 stroke-[2.2]" />
            <span>Share</span>
          </button>
        </div>

        {/* View on Map Anchor Button */}
        <button className="flex items-center space-x-1.5 hover:text-slate-800 transition-colors duration-200 cursor-pointer">
          <HiOutlineMap className="w-4 h-4 stroke-[2.2] text-slate-400" />
          <span>View on Map</span>
        </button>
      </div>

      {/* SECTION 5: Dropdown Comments Thread Panel */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col space-y-3.5 animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Comment Stream */}
          {comments.map((comment, i) => (
            <div key={i} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full ${comment.avatarBg || 'bg-[#00C853]'} text-white flex items-center justify-center font-bold text-xs shrink-0 select-none`}>
                {comment.author.charAt(0).toLowerCase()}
              </div>
              <div className="bg-[#F4F4F6] rounded-2xl px-4 py-3 flex-1 text-left">
                <div className="flex items-center">
                  <span className="text-xs font-bold text-slate-900">{comment.author}</span>
                  <span className="text-[11px] text-slate-400 font-normal ml-2">{comment.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 mt-1 leading-normal font-normal">{comment.text}</p>
              </div>
            </div>
          ))}

          {/* Write a Comment Form Input Block */}
          <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2 mt-2">
            <input 
              type="text"
              name="commentText"
              required
              placeholder="Write a comment..."
              className="flex-1 h-11 px-4 border-2 border-slate-800 rounded-xl outline-none text-slate-800 text-xs sm:text-sm font-semibold transition-all focus:border-[#7D5DF2] bg-white"
            />
            <button 
              type="submit"
              className="w-11 h-11 bg-slate-950 hover:bg-slate-900 text-white rounded-xl flex items-center justify-center transform active:scale-95 transition-all duration-200 cursor-pointer shrink-0"
              aria-label="Send comment"
            >
              <HiPaperAirplane className="w-5 h-5 -rotate-45 -mr-0.5 mt-0.5 text-white" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}