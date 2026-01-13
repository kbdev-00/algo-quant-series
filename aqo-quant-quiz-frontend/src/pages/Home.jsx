import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="section hero-gradient card-glass rounded-lg">
        <div className="container mx-auto px-4 md:flex md:items-center md:justify-between">
          <div className="md:w-1/2">
            <span className="badge">New • 2025</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">Aqo Quant — Practice DSA & Aptitude with Confidence</h1>
            <p className="mt-4 text-lg text-slate-600 max-w-prose">Timed quizzes, detailed scoring, and a leaderboard to track progress. Built for interview prep and sharp practitioners who want measurable improvement.</p>

            <div className="mt-6 flex gap-3">
              <Link to="/quizzes" className="px-5 py-3 bg-indigo-600 text-white rounded-lg shadow">Browse Quizzes</Link>
              <a href="#pricing" className="px-5 py-3 border rounded-lg">Plans & Pricing</a>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 max-w-sm">
              <div className="text-center">
                <div className="stat-number">1.2k+</div>
                <div className="text-sm text-gray-500">Practices</div>
              </div>
              <div className="text-center">
                <div className="stat-number">98%</div>
                <div className="text-sm text-gray-500">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="stat-number">24/7</div>
                <div className="text-sm text-gray-500">Access</div>
              </div>
            </div>
          </div>

          <div className="hidden md:block md:w-1/2">
            <div className="hero-illustration bg-gradient-to-tr from-indigo-500 to-teal-400 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
              <div className="text-center px-6">
                <div className="text-2xl">Practice • Pace • Perform</div>
                <div className="mt-2 text-sm">Ace interviews with repeated, timed practice</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold">What you'll get</h2>
          <p className="text-gray-600 mt-2 max-w-prose">A focused toolset for learning: timed quizzes, progressive difficulty, performance metrics and competitions.</p>

          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <a href="/quizzes" className="link-reset">
              <div className="pricing-card clickable">
                <div className="text-2xl">🎯</div>
                <h4 className="mt-3 font-semibold">Targeted Practice</h4>
                <p className="text-sm mt-2">Short, focused quizzes on core DSA topics and aptitude areas.</p>
              </div>
            </a>
            <a href="/quizzes" className="link-reset">
              <div className="pricing-card clickable">
                <div className="text-2xl">⏱️</div>
                <h4 className="mt-3 font-semibold">Timed Mode</h4>
                <p className="text-sm mt-2">Real-test pacing to build speed under pressure.</p>
              </div>
            </a>
            <a href="/quizzes" className="link-reset">
              <div className="pricing-card clickable">
                <div className="text-2xl">📈</div>
                <h4 className="mt-3 font-semibold">Progress Insights</h4>
                <p className="text-sm mt-2">Track scores, question-wise accuracy, and trend over time.</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section section-light">
        <div className="container mx-auto px-4 md:flex md:items-center md:justify-between">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold">How it works</h3>
            <ol className="mt-4 space-y-3 text-gray-700 list-decimal list-inside">
              <li>Choose a quiz from DSA or Aptitude series.</li>
              <li>Start the timed test — answer at your pace.</li>
              <li>Submit to see instant score and leaderboard placement.</li>
            </ol>
            <div className="mt-4">
              <Link to="/quizzes" className="px-4 py-2 bg-indigo-600 text-white rounded">Try a sample quiz</Link>
            </div>
          </div>

          <div className="mt-6 md:mt-0 md:w-1/2">
            <div className="testimonial">
              <div className="font-semibold">"Aqo Quant helped me improve my timing for coding interviews — short quizzes were perfect for practice between classes."</div>
                <div className="mt-2 text-sm text-gray-500">— Ketan, Software Engineer</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-semibold">Plans & Pricing</h3>
          <p className="text-gray-600 mt-2">Free forever for basic quizzes. Pro plan unlocks advanced tests and monthly leaderboards.</p>

          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="pricing-card">
              <div className="text-sm text-gray-500">Basic</div>
              <div className="text-2xl font-bold mt-2">Free</div>
              <ul className="mt-3 text-sm text-gray-600 space-y-1">
                <li>Access to core quizzes</li>
                <li>Local leaderboard</li>
              </ul>
              <div className="mt-4"><Link to="/quizzes" className="px-4 py-2 bg-indigo-600 text-white rounded">Get Started</Link></div>
            </div>
            <div className="pricing-card">
              <div className="text-sm text-gray-500">Pro</div>
              <div className="text-2xl font-bold mt-2">999 INR</div>
              <ul className="mt-3 text-sm text-gray-600 space-y-1">
                <li>All quizzes + advanced sets</li>
                <li>Monthly leaderboard</li>
                <li>Performance analytics</li>
              </ul>
              <div className="mt-4"><a className="px-4 py-2 bg-indigo-600 text-white rounded" href="#">Subscribe</a></div>
            </div>
            <div className="pricing-card">
              <div className="text-sm text-gray-500">Team</div>
              <div className="text-2xl font-bold mt-2">Contact Us</div>
              <ul className="mt-3 text-sm text-gray-600 space-y-1">
                <li>Team dashboards</li>
                <li>Custom tests</li>
              </ul>
              <div className="mt-4"><a className="px-4 py-2 border rounded" href="#">Contact Sales</a></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ & Footer */}
      <section className="section section-light">
        <div className="container mx-auto px-4 md:grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-2xl font-semibold">Frequently asked questions</h4>
            <div className="mt-4 space-y-4">
              <div>
                <div className="faq-q">Are quizzes free?</div>
                <div className="faq-a">Yes — core quizzes are free. Pro adds advanced content and analytics.</div>
              </div>
              <div>
                <div className="faq-q">Where are results stored?</div>
                <div className="faq-a">Results are stored locally (localStorage) in this demo. We can add backend persistence on request.</div>
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-0">
            <h4 className="text-2xl font-semibold">What people say</h4>
            <div className="mt-4 space-y-4">
              <div className="testimonial">
                <div className="font-semibold">"Quick quizzes, meaningful improvement — I improved my accuracy within 2 weeks."</div>
                <div className="mt-2 text-sm text-gray-500">— Rohit, Student</div>
              </div>
              <div className="testimonial">
                <div className="font-semibold">"Clean UI and fast feedback. Great for short practice sessions."</div>
                <div className="mt-2 text-sm text-gray-500">— Meera, Developer</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
