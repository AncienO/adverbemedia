-- Admin Write Policies for Authenticated Users
-- Run this in your Supabase SQL Editor

-- Categories
CREATE POLICY "Auth Insert Categories" ON categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth Update Categories" ON categories FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth Delete Categories" ON categories FOR DELETE TO authenticated USING (true);

-- Shows
CREATE POLICY "Auth Insert Shows" ON shows FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth Update Shows" ON shows FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth Delete Shows" ON shows FOR DELETE TO authenticated USING (true);

-- Hosts
CREATE POLICY "Auth Insert Hosts" ON hosts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth Update Hosts" ON hosts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth Delete Hosts" ON hosts FOR DELETE TO authenticated USING (true);

-- Show Hosts
CREATE POLICY "Auth Insert Show Hosts" ON show_hosts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth Delete Show Hosts" ON show_hosts FOR DELETE TO authenticated USING (true);

-- Episodes
CREATE POLICY "Auth Insert Episodes" ON episodes FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth Update Episodes" ON episodes FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth Delete Episodes" ON episodes FOR DELETE TO authenticated USING (true);

-- Jobs
CREATE POLICY "Auth Insert Jobs" ON jobs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth Update Jobs" ON jobs FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth Delete Jobs" ON jobs FOR DELETE TO authenticated USING (true);

-- Company Documents
CREATE POLICY "Auth Insert Documents" ON company_documents FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth Update Documents" ON company_documents FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth Delete Documents" ON company_documents FOR DELETE TO authenticated USING (true);

-- Contacts
CREATE POLICY "Auth Update Contacts" ON contacts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth Delete Contacts" ON contacts FOR DELETE TO authenticated USING (true);

-- Social Links
CREATE POLICY "Auth Insert Social Links" ON social_links FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth Update Social Links" ON social_links FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth Delete Social Links" ON social_links FOR DELETE TO authenticated USING (true);

-- News Articles
CREATE POLICY "Auth Insert News" ON news_articles FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth Update News" ON news_articles FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth Delete News" ON news_articles FOR DELETE TO authenticated USING (true);

-- Company Sections
CREATE POLICY "Auth Insert Company Sections" ON company_sections FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth Update Company Sections" ON company_sections FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth Delete Company Sections" ON company_sections FOR DELETE TO authenticated USING (true);
