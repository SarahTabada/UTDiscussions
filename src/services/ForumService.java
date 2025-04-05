package services;

import models.*;

import java.util.ArrayList;
import java.util.List;

public class ForumService {
    private List<Question> questions;

    public ForumService() {
        this.questions = new ArrayList<>();
    }

    public void postQuestion(String title, String body) {
        questions.add(new Question(title, body));
    }

    public void replyToQuestion(int questionIndex, String replyBody) {
        if (questionIndex >= 0 && questionIndex < questions.size()) {
            questions.get(questionIndex).addReply(new Reply(replyBody));
        } else {
            System.out.println("Invalid question index.");
        }
    }

    public void showQuestions() {
        for (int i = 0; i < questions.size(); i++) {
            Question q = questions.get(i);
            System.out.println(i + ": " + q.getTitle() + " — " + q.getBody());
            for (Reply r : q.getReplies()) {
                System.out.println("    ↳ " + r.getBody());
            }
        }
    }
}
