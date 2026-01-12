import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getContent, saveContent, getDeliveryFee, saveDeliveryFee } from '../utils/storage'
import './ContentEditor.css'

function ContentEditor({ onClose }) {
  const [content, setContent] = useState(getContent())
  const [activeSection, setActiveSection] = useState('hero')
  const [saved, setSaved] = useState(false)
  const [deliveryFee, setDeliveryFee] = useState(getDeliveryFee())

  useEffect(() => {
    setContent(getContent())
  }, [])

  const handleChange = (section, field, value) => {
    const newContent = { ...content }
    if (field.includes('.')) {
      const parts = field.split('.')
      const arrayMatch = parts[0].match(/^(\w+)\[(\d+)\]$/)
      if (arrayMatch) {
        const arrayName = arrayMatch[1]
        const index = parseInt(arrayMatch[2])
        const subField = parts[1]
        if (!newContent[section][arrayName]) {
          newContent[section][arrayName] = []
        }
        if (!newContent[section][arrayName][index]) {
          newContent[section][arrayName][index] = {}
        }
        newContent[section][arrayName][index][subField] = value
      }
    } else {
      newContent[section][field] = value
    }
    setContent(newContent)
    setSaved(false)
  }

  const handleSave = () => {
    saveContent(content)
    saveDeliveryFee(deliveryFee)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    // Trigger page refresh to show changes
    window.dispatchEvent(new Event('contentUpdated'))
  }

  const sections = [
    { id: 'hero', label: 'Hero Section', icon: '🏠' },
    { id: 'home', label: 'Home Page', icon: '🏡' },
    { id: 'about', label: 'About Page', icon: '📖' },
    { id: 'contact', label: 'Contact Page', icon: '📞' },
    { id: 'footer', label: 'Footer', icon: '📄' },
    { id: 'shop', label: 'Shop Page', icon: '🛍️' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ]

  const renderField = (section, field, value, label, type = 'text') => {
    if (type === 'textarea') {
      return (
        <div key={field} className="content-field">
          <label>{label}</label>
          <textarea
            value={value || ''}
            onChange={(e) => handleChange(section, field, e.target.value)}
            rows={4}
            className="content-input"
          />
        </div>
      )
    }
    return (
      <div key={field} className="content-field">
        <label>{label}</label>
        <input
          type={type}
          value={value || ''}
          onChange={(e) => handleChange(section, field, e.target.value)}
          className="content-input"
        />
      </div>
    )
  }

  const renderArrayField = (section, arrayName, items, labels) => {
    return (
      <div className="content-array-section">
        <h4 className="array-title">{labels.title}</h4>
        {items.map((item, index) => (
          <div key={index} className="array-item-card">
            <h5>{labels.itemTitle} #{index + 1}</h5>
            {Object.keys(item).map((key) => (
              <div key={key} className="content-field">
                <label>{labels.fields[key] || key}</label>
                <input
                  type="text"
                  value={item[key] || ''}
                  onChange={(e) => handleChange(section, `${arrayName}[${index}].${key}`, e.target.value)}
                  className="content-input"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="content-editor-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="content-editor-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="content-editor-header">
          <h2>Edit Site Content</h2>
          <div className="header-actions">
            {saved && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="saved-indicator"
              >
                ✓ Saved!
              </motion.span>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="save-content-button"
            >
              Save Changes
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="close-content-button"
            >
              ✕
            </motion.button>
          </div>
        </div>

        <div className="content-editor-body">
          <div className="content-sections-sidebar">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(section.id)}
                className={`section-tab ${activeSection === section.id ? 'active' : ''}`}
              >
                <span className="section-icon">{section.icon}</span>
                {section.label}
              </motion.button>
            ))}
          </div>

          <div className="content-editor-main">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="content-section-editor"
              >
                {activeSection === 'hero' && (
                  <>
                    {renderField('hero', 'title', content.hero.title, 'Hero Title')}
                    {renderField('hero', 'subtitle', content.hero.subtitle, 'Hero Subtitle', 'textarea')}
                    {renderField('hero', 'button1', content.hero.button1, 'Button 1 Text')}
                    {renderField('hero', 'button2', content.hero.button2, 'Button 2 Text')}
                  </>
                )}

                {activeSection === 'home' && (
                  <>
                    {renderField('home', 'featuredTitle', content.home.featuredTitle, 'Featured Section Title')}
                    {renderField('home', 'featuredSubtitle', content.home.featuredSubtitle, 'Featured Section Subtitle')}
                    {renderField('home', 'viewAllButton', content.home.viewAllButton, 'View All Button Text')}
                    {renderField('home', 'whyChooseTitle', content.home.whyChooseTitle, 'Why Choose Title')}
                    {renderField('home', 'whyChooseText1', content.home.whyChooseText1, 'Why Choose Text 1', 'textarea')}
                    {renderField('home', 'whyChooseText2', content.home.whyChooseText2, 'Why Choose Text 2', 'textarea')}
                    {renderField('home', 'learnMoreButton', content.home.learnMoreButton, 'Learn More Button Text')}
                    {renderArrayField('home', 'features', content.home.features, {
                      title: 'Home Features',
                      itemTitle: 'Feature',
                      fields: { icon: 'Icon', title: 'Title', description: 'Description' }
                    })}
                  </>
                )}

                {activeSection === 'about' && (
                  <>
                    {renderField('about', 'heroTitle', content.about.heroTitle, 'Hero Title')}
                    {renderField('about', 'heroSubtitle', content.about.heroSubtitle, 'Hero Subtitle')}
                    {renderField('about', 'welcomeTitle', content.about.welcomeTitle, 'Welcome Title')}
                    {renderField('about', 'welcomeText1', content.about.welcomeText1, 'Welcome Text 1', 'textarea')}
                    {renderField('about', 'welcomeText2', content.about.welcomeText2, 'Welcome Text 2', 'textarea')}
                    {renderField('about', 'welcomeText3', content.about.welcomeText3, 'Welcome Text 3', 'textarea')}
                    {renderField('about', 'whyChooseTitle', content.about.whyChooseTitle, 'Why Choose Title')}
                    {renderField('about', 'missionTitle', content.about.missionTitle, 'Mission Title')}
                    {renderField('about', 'missionText', content.about.missionText, 'Mission Text', 'textarea')}
                    {renderArrayField('about', 'features', content.about.features, {
                      title: 'About Features',
                      itemTitle: 'Feature',
                      fields: { icon: 'Icon', title: 'Title', description: 'Description' }
                    })}
                    {renderArrayField('about', 'stats', content.about.stats, {
                      title: 'Statistics',
                      itemTitle: 'Stat',
                      fields: { number: 'Number', label: 'Label' }
                    })}
                  </>
                )}

                {activeSection === 'contact' && (
                  <>
                    {renderField('contact', 'heroTitle', content.contact.heroTitle, 'Hero Title')}
                    {renderField('contact', 'heroSubtitle', content.contact.heroSubtitle, 'Hero Subtitle', 'textarea')}
                    {renderField('contact', 'infoTitle', content.contact.infoTitle, 'Info Section Title')}
                    {renderField('contact', 'infoDescription', content.contact.infoDescription, 'Info Description', 'textarea')}
                    {renderField('contact', 'mapNote', content.contact.mapNote, 'Map Note')}
                    {renderField('contact', 'formTitle', content.contact.formTitle, 'Form Title')}
                    {renderField('contact', 'submitButton', content.contact.submitButton, 'Submit Button Text')}
                    {renderArrayField('contact', 'contactInfo', content.contact.contactInfo, {
                      title: 'Contact Information',
                      itemTitle: 'Contact Item',
                      fields: { icon: 'Icon', title: 'Title', details: 'Details' }
                    })}
                  </>
                )}

                {activeSection === 'footer' && (
                  <>
                    {renderField('footer', 'tagline', content.footer.tagline, 'Tagline', 'textarea')}
                    {renderField('footer', 'newsletterTitle', content.footer.newsletterTitle, 'Newsletter Title')}
                    {renderField('footer', 'newsletterText', content.footer.newsletterText, 'Newsletter Text', 'textarea')}
                    {renderField('footer', 'newsletterButton', content.footer.newsletterButton, 'Newsletter Button Text')}
                    {renderField('footer', 'location', content.footer.location, 'Location Text')}
                  </>
                )}

                {activeSection === 'shop' && (
                  <>
                    {renderField('shop', 'heroTitle', content.shop.heroTitle, 'Hero Title')}
                    {renderField('shop', 'heroSubtitle', content.shop.heroSubtitle, 'Hero Subtitle')}
                  </>
                )}

                {activeSection === 'settings' && (
                  <>
                    <div className="content-field">
                      <label>Delivery Fee (Rs.)</label>
                      <input
                        type="number"
                        value={deliveryFee}
                        onChange={(e) => {
                          setDeliveryFee(parseFloat(e.target.value) || 0)
                          setSaved(false)
                        }}
                        className="content-input"
                        min="0"
                        step="0.01"
                        placeholder="0"
                      />
                      <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                        This fee will be automatically added to all customer orders.
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ContentEditor

