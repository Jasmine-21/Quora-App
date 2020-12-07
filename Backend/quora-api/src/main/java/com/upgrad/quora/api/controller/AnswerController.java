package com.upgrad.quora.api.controller;

import com.upgrad.quora.api.model.AnswerRequest;
import com.upgrad.quora.api.model.AnswerResponse;
import com.upgrad.quora.service.business.AnswerBusiness;
import com.upgrad.quora.service.entity.AnswerEntity;
import com.upgrad.quora.service.exception.AuthorizationFailedException;
import com.upgrad.quora.service.exception.InvalidQuestionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class AnswerController {
    @Autowired
    private AnswerBusiness answerBusiness;

    @PostMapping(value = "/question/{questionId}/answer/create", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    private ResponseEntity<AnswerResponse> postAnswer(@RequestHeader("authorization") final String authorization, @PathVariable("questionId") final String questionId, @RequestBody final AnswerRequest answerRequest) throws AuthorizationFailedException, InvalidQuestionException {
        final AnswerEntity answerEntity = new AnswerEntity();
        answerEntity.setAns(answerRequest.getContent());

        final AnswerEntity createdAnswerEntity = answerBusiness.createAnswer(answerEntity, authorization.split("Bearer ")[1], questionId);
        final AnswerResponse answerResponse = new AnswerResponse().id(createdAnswerEntity.getUuid()).status("ANSWER CREATED");
        return new ResponseEntity<>(answerResponse, HttpStatus.CREATED);
    }
}