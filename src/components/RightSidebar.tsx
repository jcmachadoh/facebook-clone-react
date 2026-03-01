import { useLanguageStore } from '../store';
import { translations } from '../i18n/translations';
import type { Contact } from '../interfaces/types';
import currentContactData from '../mocks/contacts.json';
import { RightSidebarContact } from './_sidebar/RightSidebarContact';
const contacts = currentContactData as Contact[];

export const RightSidebar = () => {
  const { language } = useLanguageStore();
  const t = translations[language];
  return (
    <aside className="hidden lg:flex flex-col w-90 h-[calc(100vh-3.5rem)] sticky top-14 pt-4 px-2 overflow-y-auto">
      <div className="text-gray-500 dark:text-gray-400 font-semibold text-[17px] mb-2 px-2">{t.contacts}</div>
      {
        contacts.map((contact: Contact) => (
          <RightSidebarContact
            key={contact.id}
            contact={contact}
          />
        ))
      }
    </aside>
  );
};