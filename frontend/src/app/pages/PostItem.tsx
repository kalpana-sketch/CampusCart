import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Upload, X, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
<<<<<<< HEAD
import { useAuth } from '../context/AuthContext.js';
import { categories } from '../data/mockData.js';
import api from '../services/api.js';
=======
import { useAuth } from '../context/AuthContext';
import { categories } from '../data/mockData';
import api from '../services/api';
>>>>>>> 3bb46ca4d2d31115eb02cb98dad088dcab647242


export function PostItem() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Textbooks',
    condition: 'Good',
    isDonation: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert images to base64
      const imageBase64List = await Promise.all(
        imageFiles.map((file) => {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
          });
        })
      );

      // If no images are uploaded, we can provide a default or leave it empty array
      const imagesToSubmit = imageBase64List.length > 0 ? imageBase64List : ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80'];

      await api.post('/items', {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price || '0'),
        category: formData.category,
        images: imagesToSubmit,
<<<<<<< HEAD
        condition: formData.condition,
        isDonation: formData.isDonation
=======
>>>>>>> 3bb46ca4d2d31115eb02cb98dad088dcab647242
      });

      setIsSubmitting(false);
      setShowSuccess(true);

      // Show success message, then redirect
      setTimeout(() => {
        navigate('/browse');
      }, 2000);
    } catch (error) {
      console.error('Error posting item:', error);
      setIsSubmitting(false);
      alert('Failed to post item');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      // Validate file size (10MB)
      const validFiles = files.filter(f => f.size <= 10 * 1024 * 1024);
      if (validFiles.length < files.length) {
        alert('Some files exceed the 10MB limit and were removed.');
      }
      
      setImageFiles(prev => [...prev, ...validFiles]);
      
      validFiles.forEach(file => {
        const previewUrl = URL.createObjectURL(file);
        setImagePreviews(prev => [...prev, previewUrl]);
      });
      e.target.value = '';
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => {
      // revoke object url to avoid memory leaks
<<<<<<< HEAD
      const url = prev[index];
      if (url) URL.revokeObjectURL(url);
=======
      URL.revokeObjectURL(prev[index]);
>>>>>>> 3bb46ca4d2d31115eb02cb98dad088dcab647242
      return prev.filter((_, i) => i !== index);
    });
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50/30 to-purple-50/30 dark:from-neutral-950 dark:via-blue-950/20 dark:to-purple-950/20 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
            List an Item
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Share what you no longer need with fellow students
          </p>
        </motion.div>

        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mb-6 bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3"
          >
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-500" />
            <div>
              <p className="font-semibold text-green-600 dark:text-green-500">Item posted successfully!</p>
              <p className="text-sm text-green-600/80 dark:text-green-500/80">Redirecting to your listings...</p>
            </div>
          </motion.div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 space-y-6"
        >
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
              Photos
            </label>
            {imagePreviews.length > 0 && (
              <div className="flex gap-4 mb-4 overflow-x-auto pb-2">
                {imagePreviews.map((preview, idx) => (
                  <div key={idx} className="relative w-24 h-24 flex-shrink-0">
                    <img src={preview} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover rounded-xl border border-neutral-200 dark:border-neutral-700" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 focus:outline-none"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
            >
              <input 
                type="file" 
                multiple 
                accept="image/png, image/jpeg" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageChange}
                title=""
              />
              <Upload className="w-12 h-12 mx-auto mb-4 text-neutral-400" />
              <p className="text-neutral-600 dark:text-neutral-400 mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                PNG, JPG up to 10MB
              </p>
            </motion.div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Calculus Textbook 9th Edition"
              className="w-full px-4 py-3 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white shadow-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the item's condition, usage, and any other relevant details..."
              rows={4}
              className="w-full px-4 py-3 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white resize-none shadow-sm"
            />
          </div>

          {/* Category & Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
<<<<<<< HEAD
                className="w-full px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white shadow-sm cursor-pointer"
=======
                className="w-full px-4 py-3 bg-white/50 dark:bg-neutral-900 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white shadow-sm"
>>>>>>> 3bb46ca4d2d31115eb02cb98dad088dcab647242
              >
                {categories.filter((c: string) => c !== 'All').map((cat: string) => (
                  <option key={cat} value={cat} className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                Condition *
              </label>
              <select
                required
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
<<<<<<< HEAD
                className="w-full px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white shadow-sm cursor-pointer"
=======
                className="w-full px-4 py-3 bg-white/50 dark:bg-neutral-900 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white shadow-sm"
>>>>>>> 3bb46ca4d2d31115eb02cb98dad088dcab647242
              >
                <option value="New" className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">New</option>
                <option value="Like New" className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">Like New</option>
                <option value="Good" className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">Good</option>
                <option value="Fair" className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">Fair</option>
              </select>
            </div>
          </div>

          {/* Price or Donation */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <input
                type="checkbox"
                id="isDonation"
                checked={formData.isDonation}
                onChange={(e) => setFormData({ ...formData, isDonation: e.target.checked, price: e.target.checked ? '0' : formData.price })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="isDonation" className="text-sm font-medium text-neutral-900 dark:text-white">
                I want to donate this item for free
              </label>
            </div>

            {!formData.isDonation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                  Price *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400">
                    $
                  </span>
                  <input
                    type="number"
                    required={!formData.isDonation}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white shadow-sm"
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-white/50 dark:bg-white/5 backdrop-blur-md text-neutral-900 dark:text-white rounded-lg font-medium hover:bg-white/70 dark:hover:bg-white/10 transition-all border border-white/20 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              disabled={isSubmitting}
              className="relative flex-1 px-6 py-3 rounded-lg font-medium text-white shadow-lg overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-purple-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Posting...
                  </>
                ) : (
                  'Post Item'
                )}
              </span>
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}